
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN);
const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });

//To generate test summary from gemini
const getSummaryFromGemini=async(contents)=>{ 
    const combinedContent = contents
        .map(file => `File: ${file.path}\nCode:\n${file.content}`)
        .join("\n\n"); 

    const prompt= ` Read the following JavaScript/JSX code files and generate 2-3 meaningful test case summaries for each file.
                    Rules for your response:
                    1. Output ONLY a valid JSON array. Do not include any text, comments, markdown formatting, or backticks.
                    2. The JSON array should have this exact structure:
                    [
                    { "file": "file_path", "content": "Test Case Summaries" }
                    ]
                    3. "file" must be the file path as provided in the input.
                    4. "content" must be a short string describing the test case summaries for that file.
                    5. Do not include anything before or after the JSON array — only the array itself.
                    \n\n${combinedContent}`;
    try {
        const result=await model.generateContent(prompt)
        const textOutput = result.response.candidates[0].content.parts[0].text;
        const parsedOutput = JSON.parse(textOutput);
        //console.log("parseOutput",parsedOutput)
        return parsedOutput;
    } catch (error) {
        console.log("Error getting summary:", error.message);
        return null
    }
}

//to generate test code from gemini
const getTestCodeFromGemini=async(file,summary)=>{
    const codePrompt= `Generate a jest test code for the following file based on this summary:
    File:${file}
    Summary: ${summary}
    Rules for your response:
        Rules:
        - Output ONLY raw JavaScript Jest code
        - No markdown, no backticks,
        - Do not escape characters, no \\n or + signs `

    try {
        const res=await model.generateContent(codePrompt)
        const codeOutput=res.response.candidates[0].content.parts[0].text.trim()
        //const parsedCode = JSON.parse(codeOutput)
        console.log("codeOutput",codeOutput)
        return codeOutput

    } catch (error) {
        console.log("Error getting summary:", error.message);
        return null 
    }
}
export {getSummaryFromGemini,getTestCodeFromGemini}