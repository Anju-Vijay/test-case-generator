import { getTestCodeFromGemini } from "../services/aiServices.js"

// to generate test code 
const getTestCode=async(req,res)=>{

    const {file,summary}=req.body
    const result= await getTestCodeFromGemini(summary,file)
    res.json({code: result})

}
export {getTestCode}