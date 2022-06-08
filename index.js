const expres=require("express")
const path = require("path")
const multer=require("multer")


const app=expres()

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , "./images")
    },
    filename:(req,file,cb)=>{
        cb(null , Date.now() +'--'+ file.originalname)
    }
})

const upload=multer({storage:fileStorageEngine})


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.post('/single',upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("File Uploaded Successfully")
})

app.post('/multiple',upload.array('images',3),(req,res)=>{
    console.log(req.files);
    res.send("Multiple Files Uploaded Successfully")
})


app.listen(8080,()=>{
    console.log("ur server started")
})