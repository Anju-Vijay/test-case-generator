import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
    const navigate=useNavigate()
    const [repoInput,setRepoInput]=useState('')
    const onSubmitHandler=()=>{
        const[owner, repo]=repoInput.replace('https://github.com/', '').split('/')
        if(!owner || !repo){
           return alert("Please enter valid repo/owner")
        }
        navigate(`/list-repo-files/${owner}/${repo}`)
    }
  return (
    <div className='w-full flex justify-center items-center h-screen'>
        <div className='bg-lime-300 opacity-60 rounded p-4 w-3/4 h-1/4 flex justify-between items-center '>
            <input value={repoInput} onChange={(e)=>setRepoInput(e.target.value)} className='bg-lime-200 font-semibold w-2/3 h-14 p-2 rounded border border-lime-400' type="text" placeholder='Enter the git repo' />
            <button onClick={onSubmitHandler} className='p-3 bg-lime-200 h-14 rounded cursor-pointer font-semibold border border-lime-400 shadow-2xl hover:bg-lime-400'>Get Repo Files</button>
        </div>
    </div>
  )
}

export default Home