import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

   const prompt =
      "give roadmap of ai and ml so that i will learn this in just 3  months"
   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();
   console.log(text);
}
run();