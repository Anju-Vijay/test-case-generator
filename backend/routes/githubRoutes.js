import express from 'express'
import { getRepoFiles } from '../controller/githubController.js'

const router=express.Router()

router.get('/files', getRepoFiles)

export default router;