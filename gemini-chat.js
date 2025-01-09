import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline';


//#bug --> user input console after pressing eneter making it twice seeing fix it
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})


async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat= model.startChat({
        history:[],
        generationConfig:{
            maxOutputTokens:500,
        }
    })
    console.log("Chatbot started. Type 'exit' to quit.");
    async function askAndRespond(){
        rl.question("You:",async(msg)=>{
            if(msg.toLowerCase()==='exit'){
                rl.close();
                console.log("Chatbot ended.");
            }else{
                const result = await chat.sendMessage(msg);
                const response = await result.response;
                const text = response.text();
                console.log('AI:',text);
                askAndRespond();
            }
        })
    }
    askAndRespond();
    
}
run();