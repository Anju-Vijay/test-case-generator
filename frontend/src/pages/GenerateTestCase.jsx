
import { useEffect ,useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'

const GenerateTestCase = () => {

    const {state}=useLocation()
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const {owner, repo, checkboxSelection}= state || {}
    const[testCaseSummary,setTestCaseSummary]=useState([])
    const[testCode,setTestCode]=useState("")
    const [copied, setCopied] = useState(false);

    //to generate test case summaries
    const generateTestCases=async()=>{
        try {
            const response=await axios.post(backendUrl+'/api/github/content',
            {
                owner,
                repo,
                selectedFiles: checkboxSelection
            })
            setTestCaseSummary(response.data.items)
           // console.log(response.data.items)
        } catch (error) {
            console.log(error)
        }
    }
    // to generate test codes
    const handleGenerateCode=async(file,summary)=>{
        setTestCode('')
        const response=await axios.post(backendUrl+'/api/ai/code',{file,summary})
        console.log(response.data)
        
        setTestCode(response.data.code)
    }
    // top copy test code to clipboard
    const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

    useEffect(()=>{
        generateTestCases()

    },[])
    
    return (
    <div className=' w-full flex flex-col md:flex-row items-center md:items-start min-h-screen p-5 gap-5 text-sm sm:text-base md:text-lg '>
        {/* Test Cases Column */}
        <div className='w-3/4 sm:1/2 sm:h-[150vh] bg-lime-300 opacity-60 rounded flex flex-col max-h-[70vh] sm:max-h-[80vh]'>
            <h1 className='p-3 border-b-4 border-lime-200'><span className='font-bold text-xl'>Test Cases:</span>{' '}{owner}/{repo}</h1>
            {testCaseSummary?.map((item, index) => (
            <div key={index} className='w-full h-full p-3 flex flex-col gap-3 items-center  '>
                <h3 className='font-semibold mb-2'>Test Case for:<span>{" "}{item.file}</span></h3>
                <ul className="bg-lime-200 p-2 rounded overflow-auto">
                
                    <li  className="text-sm">{item.content}</li>
                
                </ul>
                <Button onClick={()=>handleGenerateCode(item.file,item.content)} title={'Generate Code'}/>
                
            </div>
            ))}
        </div>
          {/* Test Code */}
        <div className='w-3/4 sm:1/2  h-[150vh] md:h-full bg-lime-200 opacity-60 rounded  flex flex-col overflow-x-auto  max-h-[70vh] sm:max-h-[80vh] text-sm sm:text-base md:text-lg '>
            <h1 className='p-3 border-b-4 border-lime-300 font-bold text-xl'>Test Code:</h1>
            {testCode?
            <div className='w-full h-full p-3 flex flex-col gap-3  '>
                <pre className="w-full bg-lime-300 p-2 rounded  whitespace-pre-wrap break-words">
                    <code>{testCode}</code>
                </pre>
                <Button onClick={()=>handleCopy(testCode)} title={copied ? "✅ Copied!" : "📋 Copy"}/>
            </div>
            : <p className='font-semibold text-sm text-center m-auto p-5'>Please select a summary to display its test code</p>}
             
        </div>
        
    </div>
  )
}

export default GenerateTestCase 