import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const GenerateTestCase = () => {

    const {state}=useLocation()
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const {owner, repo, checkboxSelection}= state || {}
    const generateTestCases=async()=>{
        try {
            const response=await axios.post(backendUrl+'/api/github/content',
            {
                owner,
                repo,
                selectedFiles: checkboxSelection
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        generateTestCases()

    },[])
    
    return (
    <div className=' w-full  flex  flex-col gap-3 justify-center items-center h-screen '>
        <div className='w-3/4 h-full mt-5 mb-10 bg-lime-300 opacity-60 rounded p-4 flex flex-col overflow-auto '>
            <h1 className='p-3 border-b-4 border-lime-200'><span className='font-bold text-xl'>Test Cases:</span>{' '}{owner}/{repo}</h1>
            {checkboxSelection?.map((file)=>(
            <div key={file} className='w-full h-1/2 p-3 flex flex-col'>
                <h3 className='font-semibold mb-2'>Test Case for:<span>{" "}{file}</span></h3>
                <textarea className=' w-full h-full p-2 bg-lime-200  text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium minus enim rem explicabo soluta, architecto consectetur excepturi libero. Ratione temporibus laudantium nihil recusandae ut quae accusamus delectus porro mollitia commodi? lor</textarea>
            </div>
            ))}
        </div>
    </div>
  )
}

export default GenerateTestCase