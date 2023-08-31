
/**
 * There is a NodeJS client library but the code samples dont show Auth
 * https://cloud.google.com/nodejs/docs/reference/aiplatform/latest
 */


/**
 * Vars
 */
var API_ENDPOINT="us-central1-aiplatform.googleapis.com"; // Change it only if your model is deployed on a different region
var PROJECT_ID="ai-projects-396222"; //Your project ID
var MODEL_ID="text-bison@001";


/**
 * APP CODE
 */
var gAuth = require('./googleAuth');

/**
 * Starts and runs the app
 */
const getGenAi = async (message="") => {

    const auth = await gAuth.getAuth()
    const accessToken = await auth.getAccessToken()

    
    try{
        var response = await fetch("https://"+API_ENDPOINT+"/v1/projects/"+PROJECT_ID+"/locations/us-central1/publishers/google/models/"+MODEL_ID+":predict", {
            method: "post",
            contentType: 'application/json',
            muteHttpExceptions:false,
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify( {
                instances: [{ content: message }],
                parameters: { temperature: 0.2, maxOutputTokens: 256, topP: 0.8, topK: 40 },
        })
        });
        
    } catch(e){
        console.log(e);
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      var res = await response.json();
      console.log(res.predictions[0].content)
}

module.exports = { getGenAi }
