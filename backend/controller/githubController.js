import { fetchRepoFiles,fetchContent } from "../utils/githubAPI.js";
import {getSummaryFromGemini} from '../services/aiServices.js'

//get repo files
const getRepoFiles=async(req,res)=>{
    const {owner,repo}=req.params
    try {
        const files=await fetchRepoFiles(owner,repo)
        res.json(files)
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message: "Failed to fetch files"})  
    } 
}

//get content of selected files
const getFileContent=async(req,res)=>{
   const {owner,repo,selectedFiles}=req.body
   try {
        const contents=await fetchContent(owner, repo, selectedFiles)
        const listItems=await getSummaryFromGemini(contents)
        res.json({ items: listItems });    

   } catch (error) {
        console.log(error.message)
        res.json({success:false , message: "Failed to fetch content"}) 
   }
}
export {getRepoFiles,getFileContent}