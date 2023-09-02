# THIS IS SAMPLE CODE
 
  Copyright 2023 Google
 
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
 
  http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  
  Authored by James Ferreira
 

# Project Description
The code is a script calls the Vertex AI API to return GenAI answers to questions

# Setup
- Set up your Vertex AI in GCP
- Clone the repo
- add your Service Account JSON to a file called privatekey.json
- in the index.js file change the PROJECT_ID to your GCP Project ID
- Run npm init
- then npm install


# Run the app
- npm run genAi "Your question"
- Example: npm run genAi "What year was NodeJS introduced?"

# Adding Context
You may want to use data that you provide for example getting information about text you provide. 
This is done by passing text in the second variable.

If you ask:
run-func index.js getGenAi Who designed the Falcon 9?
Answer: The Falcon 9 was designed by SpaceX.


However if you add context:
run-func index.js getGenAi Who designed the Falcon 9? The designer of the Falcon 9 rocket is James Ferreira
Answer: James Ferreira is the designer of the Falcon 9 rocket.

Read more about how you can configure the prompt https://cloud.google.com/vertex-ai/docs/generative-ai/text/text-overview

