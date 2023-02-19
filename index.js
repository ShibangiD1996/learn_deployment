
const express=require("express")
const { connection } = require("./db")
const { authenticate } = require("./middleware/Authentication.middleware")
const { noteRouter } = require("./routes/Note.route")
const { userRouter } = require("./routes/User.routes")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOme PAge")
})

app.use("/users",userRouter)

app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(" Cannot connected to DB");
        console.log(error);
    }
    console.log(`Running the server at port ${process.env.port}`);
})