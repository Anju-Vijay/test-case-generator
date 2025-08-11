import express from 'express'
import { getTestCode } from '../controller/aiController.js'


const router=express.Router()

router.post('/code', getTestCode)

export default router;