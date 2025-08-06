import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ListRepoFiles from './pages/ListRepoFiles'
import GenerateTestCase from './pages/GenerateTestCase'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list-repo-files/:owner/:repo' element={<ListRepoFiles/>}/>
        <Route path='/generate-test-case' element={<GenerateTestCase/>}/>
      </Routes>
    </div>
  )
}

export default App