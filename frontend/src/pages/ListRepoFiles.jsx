import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Button from '../components/Button'

const ListRepoFiles = () => {
    const {owner, repo}=useParams()
    const navigate=useNavigate()
    const backendUrl= import.meta.env.VITE_BACKEND_URL

    const [files,setFiles]=useState([])
    const [checkboxSelection,setCheckboxSelection]=useState([])

    //to get list of files from the github repo
    const getFiles=async()=>{
                 try {
                    const response=await axios.get(`${backendUrl}/api/github/files/${owner}/${repo}`)
                    console.log(response.data);
                    setFiles(response.data)
                } catch (error) {
                    console.log(error)
                }
            }

    //To store selected files from the list
    const storeCheckboxSelection=(filePath)=>{
    setCheckboxSelection((prev)=>prev.includes(filePath)? 
    prev.filter((f)=>f!==filePath) :
    [...prev,filePath])
    }

    const onSubmitHandler=()=>{
        try {
            navigate('/generate-test-case',{state: {owner,repo,checkboxSelection}})
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        getFiles()   
    },[owner,repo])
    
    
return (
    <div className=' w-full  flex  flex-col gap-3 justify-center items-center h-screen '>
        <div className='w-3/4 h-3/4 bg-lime-300 opacity-60 rounded p-4 flex flex-col overflow-auto '>
            <h1 className='p-3 border-b-4 border-lime-200'><span className='font-bold text-xl'>Files in Git Repo:</span> {owner}/{repo}</h1>
            <div className='m-4'>
                <ul className='mt-3'>
                    {files.map((file)=>(
                    <li key={file.path} className='w-full border border-lime-400 font-semibold flex gap-2 p-2 mb-2 bg-lime-200 rounded cursor-pointer'>
                        <input onChange={()=>storeCheckboxSelection(file.path)} type='checkbox' checked={checkboxSelection.includes(file.path)}/>
                        {file.path}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        <Button title={'Generate Test Case'}  onClick={onSubmitHandler}/>
    </div>
  )
}

export default ListRepoFiles