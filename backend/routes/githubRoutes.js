import express from 'express'
import { getRepoFiles,getFileContent } from '../controller/githubController.js'

const router=express.Router()

router.get('/files/:owner/:repo', getRepoFiles)
router.post('/content', getFileContent)

export default router;