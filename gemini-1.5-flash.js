import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType: mimeType,
        }
    }
}
async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "what is the difference between these two images"
    const imageParts = [
         fileToGenerativePart('./image copy.png', 'image/png'),
         fileToGenerativePart('./image copy 2.png', 'image/png')
        ];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}
run();