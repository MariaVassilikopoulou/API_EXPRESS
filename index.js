const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");
const PORT = 3000;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
app.use(express.json());

app.get("/", (req, res) =>{
     res.send("Its Working");
     res.sendFile(__dirname + "/index.html")
     });



app.get("/products",async (req,res)=>{
    try{ 
        let response= await axios.get("https://apimeddotnet.azurewebsites.net/products", { httpsAgent });
        res.send(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    });

app.get("/product/:id",async(req,res)=>{
    try{
        let response = await axios.get(`https://apimeddotnet.azurewebsites.net/product/${req.params.id}`,{ httpsAgent });
  
        res.json(response.data);
    
}catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

app.put("/product/:id", async(req,res)=>{
   
    try{
        let response = await axios.put(`https://apimeddotnet.azurewebsites.net/product/${req.params.id}`,
        {productName: req.body.productName,
        productPrice: req.body.productPrice,
        productType: req.body.productType }, { httpsAgent });
        res.json(response.data);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/product/:id", async(req,res)=>{
   try{ let response = await axios.delete(`https://apimeddotnet.azurewebsites.net/product/${req.params.id}`,{ httpsAgent });

         res.json(response.data);
    }
        catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

app.post("/product", async(req, res)=>{
try{let response= await axios.post("https://apimeddotnet.azurewebsites.net/product", {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productType: req.body.productType
}, {
    httpsAgent: httpsAgent  
});
res.json({message:"product was added to the list",data: response.data});
}catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});



app.listen(PORT, async()=>{
    console.log("Listening to PORT: " + PORT);
});
