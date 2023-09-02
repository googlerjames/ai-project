
/**
 * This is an example of using Text Prompts in Vertex AI
 * https://cloud.google.com/vertex-ai/docs/generative-ai/text/text-overview
 */


/**
 * consts
 */
const API_ENDPOINT="us-central1-aiplatform.googleapis.com"; // Change it only if your model is deployed on a different region
const PROJECT_ID="ai-projects-396222"; //Your project ID
const MODEL_ID="text-bison@001";
const TEXT_LENGTH = 5000 //For limiting the context 



/**
 * APP CODE
 */
const gAuth = require('./googleAuth');
const { convert } = require('html-to-text');

/**
 * This function will take a message and send it to Vertex AI 
 * You can learn more about text prompts here:
 * https://cloud.google.com/vertex-ai/docs/generative-ai/text/text-overview
 * @param message {String} the question you are asking
 * @param context {String} Optional The data you would like considered when asking a question 
 *                                  Data Classifiers can be used for example Review: your reveiw text
 *                                  EXPERIMENTAL Websites can be used but they need to be mainly body text 
 * @return {String} Generative AI answer
 */
const getGenAi = async (message, context='') => {


    const auth = await gAuth.getAuth()
    const accessToken = await auth.getAccessToken()

    if(context.match(/^https?:\/\//)){ //*****EXPERIMENTAL*******
        console.log('its a url')       
        const resp = await fetch(context)
        if (resp.ok) {
            const htmlString = await resp.text();
            const webText = convert(htmlString)
            context = `Text: ${webText}`
        }
    }else if(!context.match(/^[a-zA-Z]+:\s/) && context !==""){
        context = `Text: ${context}`
    }
    const prompt = `${message}\n${context.substring(0, TEXT_LENGTH)}`
    //console.log(prompt)
    //return
    try{
        const response = await fetch("https://"+API_ENDPOINT+"/v1/projects/"+PROJECT_ID+"/locations/us-central1/publishers/google/models/"+MODEL_ID+":predict", {
            method: "post",
            contentType: 'application/json',
            muteHttpExceptions:false,
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify( {
                instances: [{ "prompt": prompt}],
                parameters: { temperature: 0.2, maxOutputTokens: 256, topP: 0.8, topK: 40 }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
        const res = await response.json();
        //console.log(res.predictions[0].content)
        return res.predictions[0].content
        
    } catch(e){
        console.log(e);
    }

}

module.exports = { getGenAi }
