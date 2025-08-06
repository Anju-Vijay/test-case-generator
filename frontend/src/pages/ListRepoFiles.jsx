import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'

const ListRepoFiles = () => {
    const {owner, repo}=useParams()
    const navigate=useNavigate()

    const [files,setFiles]=useState([])
    const [checkboxSelection,setCheckboxSelection]=useState([])
    useEffect(()=>{
        const dummyFiles=[
            {path:"src/App.js"},
            {path:"src/index.js"},
            {path:"src/components/Button.jsx.js"}
        ]
        setFiles(dummyFiles)
    },[owner,repo])
    
    const storeCheckboxSelection=(filePath)=>{
        setCheckboxSelection((prev)=>prev.includes(filePath)? 
        prev.filter((f)=>f!==filePath) :
        [...prev,filePath])
    }
    const onSubmitHandler=()=>{
        navigate('/generate-test-case',{state: {owner,repo,checkboxSelection}})
    }
return (
    <div className=' w-full  flex  flex-col gap-3 justify-center items-center h-screen '>
        <div className='w-3/4 h-1/2 bg-lime-300 opacity-60 rounded p-4 flex flex-col overflow-auto '>
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
        <button onClick={onSubmitHandler} className='p-3  bg-lime-200 h-14 rounded cursor-pointer font-semibold border border-lime-400 shadow-2xl hover:bg-lime-400'>Generate Test Case</button>
    </div>
  )
}

export default ListRepoFiles