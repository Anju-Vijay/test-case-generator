
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN);
const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });


const getSummaryFromGemini=async(contents)=>{ 
    const combinedContent = contents
        .map(file => `File: ${file.path}\nCode:\n${file.content}`)
        .join("\n\n");

    const prompt= `Read the following JavaScript/JSX code files and generate 2 to 3 meaningful test case summaries for each. The summaries should describe what kind of test cases can be written based on the code functionality.\n\n${combinedContent}`;
    try {
        const result=await model.generateContent(prompt)
        const text = await result.response.text()
        return text
    } catch (error) {
        console.log("Error getting summary:", error.message);
        return null
    }
}

export {getSummaryFromGemini}