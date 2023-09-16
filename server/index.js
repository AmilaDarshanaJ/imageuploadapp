const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const schema = new mongoose.Schema({
    image : String
})
const ImageModel = mongoose.model("Image",schema)

app.get("/",async(req,res)=>{
    const data = await (await ImageModel.find({})).reverse()
    res.json({message : "All Image", data: data})
})

app.post("/upload",async(req,res)=> {
    console.log(req.body)
    const image = new ImageModel({
        image : req.body.img
    })
    await image.save()
    res.send({message: "Image Upload Successfully", success:true})
})

mongoose.connect("mongodb://127.0.0.1:27017/imagebase64")
.then(()=>{
    console.log("Connect to DB")
    app.listen(PORT,()=>console.log("Server is running at " +PORT))
}).catch((err)=>{
    console.log(err)
})

