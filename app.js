import helmet from 'helmet'
import express from 'express'
import routes from '../internship/routes/Userroutes.js'

const app = express();

app.use(express.json())
app.use(helmet());



app.use("/", routes)

app.listen(3000, ()=>{
    console.log("server running at http://localhost:3000");
    
})