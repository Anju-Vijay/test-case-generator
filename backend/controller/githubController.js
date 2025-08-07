import { fetchRepoFiles } from "../utils/githubAPI.js";

//get repo files
const getRepoFiles=async(req,res)=>{
    const {owner,repo}=req.query;
    try {
        const files=await fetchRepoFiles(owner,repo)
        res.json(files)
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message: "Failed to fetch files"})  
    }
    
}

export {getRepoFiles}