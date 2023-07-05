const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect("mongodb://localhost:27017/Products").then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log("error :" + err);
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

const productSchema = new mongoose.Schema({
    name : String,
    desc : String,
    price : Number
})

// CREATE/POST
const product = new mongoose.model("Products",productSchema)

app.post("/api/products",async (req,res)=>{

    const p = await product.create(req.body);

    res.status(201).json({
        success: true,
        p
    })
})

// READ/GET
app.get("/api/products", async (req,res) =>{

    const p = await product.find();

    res.status(200).json({
        success: true,
        p
    })
})

// UPDATE/PUT
app.put("/api/products/:id", async (req,res)=>{

    let p = await product.findById(req.params.id);

    p = await product.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({
        success: true,
        p
    })
})

//DELETE
app.delete("/api/products/:id", async (req,res)=>{

    let p = await product.findByIdAndDelete(req.params.id);

    if(!p){
        res.status(500).json({
            success: false,
            message:"not found"
        })
    }

    res.status(200).json({
        success: true,
        message:"deleted"
    })
})

app.listen(4500,()=>{
    console.log("server is on http://localhost:4500");
})