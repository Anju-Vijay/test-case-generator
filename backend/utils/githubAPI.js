import axios from "axios"

const Git_PAT=process.env.GIT_TOKEN

const fetchRepoFiles=async(owner,repo)=>{
    try {
        
        const response=await axios.get(`http://api.github.com/repos/${owner}/${repo}/contents`,
        {headers:{Authorization:`token ${Git_PAT}`}}
        )
        const files= response.data.filter((item) => item.type === "file").map((file) => ({ path: file.path }))
        return files

    } catch (error) {
        console.error("Error fetching files:", error.message);
        return [];
    }
    
}
export {fetchRepoFiles}