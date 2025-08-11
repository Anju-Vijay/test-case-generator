import express from "express"
import cors from "cors"
import "dotenv/config"
import githubRoutes from "./routes/githubRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

//config
const app=express()
const port=process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/api/github', githubRoutes)
app.use('/api/ai',aiRoutes)


app.get('/', (req,res)=>{
    res.send('API working')

})
app.listen(port,()=>console.log("Server Started on :" + port))