import axios from "axios"

const Git_PAT=process.env.GIT_TOKEN

//fetch repo files from github
const fetchRepoFiles=async(owner,repo,path="")=>{
    try {

        const response=await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
            headers:{Authorization:`token ${Git_PAT}`}
        }
        )
        let allFiles=[]
        for(const item of response.data){
            if(item.type==="file"){
                allFiles.push({path: item.path})

            }else if(item.type==="dir"){
                const nestedFiles=await fetchRepoFiles(owner,repo,item.path)
                allFiles=allFiles.concat(nestedFiles)
            }
        }
        const allCodeFiles=allFiles.filter(file=>
            file.path.endsWith('.js') || file.path.endsWith('.jsx')
        )
        return allCodeFiles

    } catch (error) {
        console.error("Error fetching files:", error.message);
        return [];
    }
    
}

//fetch content of a file from github
const fetchContent=async(owner, repo, selectedFiles)=>{

        const contentList=[]
        for(const filePath of selectedFiles){
            try {
            const response=await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
            {
                headers:{
                    Authorization:`token ${Git_PAT}`,
                    Accept: "application/vnd.github.v3.raw",
                    }
            }
            )
            contentList.push({
                path: filePath,
                content: response.data,
            })

            } catch (error) {
            
                console.error("Error fetching content:", error.message);
            }
    }
    return contentList
}
export {fetchRepoFiles, fetchContent}