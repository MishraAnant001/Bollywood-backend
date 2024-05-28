import express from "express"
import config from "config"
import cookieParser from "cookie-parser"
import { connectDB } from "./src/DB/connectdb"
import { mainRouter } from "@routes"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)
async function start() {
    try {
        const dburl:string = config.get("MONGOURI")
        const port:number = config.get("PORT")
        await connectDB(dburl)
        console.log("Database connected!")
        app.listen(port,()=>{
            console.log("Server is listening on port ",port)
        })
    } catch (error:any) {
        console.log(error.message)
    }
}
start()