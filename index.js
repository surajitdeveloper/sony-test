const express = require("express")

const bodyParser = require('body-parser')

const app = express()
const PORT = 3005

var user = []

app.use(bodyParser())
app.get("/",(req, res)=>{
    res.json({message: "App started Successfully"})
})

app.put("/insert-user", (req, res)=>{
    // console.log(req)
    const {username} = req.body
    if(!username){
        res.status(500).json({message: "invalid user obj"})
        return;
    }
    const userext = user.find(e=> e.username === username)
    if(userext){
        res.status(500).json({message: "user already exists"})
        return;
    }
    if(req.body) user.push(req.body)

    res.json({user: "User inser Successfully"})
})
app.patch("/update-user", (req, res)=>{
    // console.log(req)
    const {username} = req.body
    if(!username){
        res.status(500).json({message: "invalid user obj"})
        return;
    }
    const userext = user.find(e=> e.username === username)
    if(!userext){
        res.status(500).json({message: "user doesnot exists"})
        return;
    }
    
    let newUser = user.map(e=>{
        if(e.username == username){
            e =  req.body
        }
        return e
    })
    user = newUser

    res.json({user: "User update Successfully"})
})

app.get("/user",(req, res)=>{
    res.json({user: user})
})

app.get("/user/:username",(req, res)=>{
    const {username } = req.params
    if(!username) {
        res.status(500).json({message: "User not found"})
        return;
    }

    res.json({user: user.find(e=> e.username === username)})
})

app.delete("/user/:username",(req, res)=>{
    const {username } = req.params
    if(!username) {
        res.status(500).json({message: "User not found"})
        return;
    }

    const newUser = []

    user.forEach(e=>{
        if(e.username != username){
            newUser.push(e)
        }
    })
    user = newUser

    res.json({message: " user deleted successfully"})
})


app.listen(PORT, ()=>{
    console.log(`App successfully runs on ${PORT}`)
})