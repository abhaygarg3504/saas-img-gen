import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import userRouter from "./router/userRoutes.js";
import imageRouter from "./router/imageRoutes.js";

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json())
app.use(cors())
await connectDB()
app.get('/', async(req, res)=>{
    res.send("API Working")
})

app.use("/api/user", userRouter)
app.use("/api/image", imageRouter)
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})