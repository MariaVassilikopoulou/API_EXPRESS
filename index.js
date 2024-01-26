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

/*const initialProduct={
    id:1,
    productName: "Classic Cheesecake",
    productPrice: 125,
    productType: "Dessert"
};

const products = [initialProduct]; */

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
    //let productToDisplay = products.find(p => p.id === parseInt(req.params.id));

    /*if (!productToDisplay){
        res.status(404).send("The product does not exist ");
    }else{*/
        res.json(response.data);
    
}catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});

/*app.post("/product",async(req,res)=>{
    try {
       await axios.post('http://localhost:3000/resetIds');
    
    console.log("The post was trigered");
    console.log(req.body);
    let addProduct={
        id: req.body.id,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productType: req.body.productType
    };
 
    products.push(addProduct);
    res.send(products);
} catch (error) {
  
    res.status(500).send('Internal Server Error');
}
});*/


app.put("/product/:id", async(req,res)=>{
    /*let  productToUpdate =products.find(p=> p.id ===parseInt(req.params.id));
    if(!productToUpdate){
        res.status(404).send("There is no product to update");
    }else{*/
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

   /* let productToDelete = products.find(p=> p.id === parseInt(req.params.id));
    if(!productToDelete){
        res.status(404).send("no product to delete here!");
    }else{
        let index = products.indexOf(productToDelete);
        products.splice(index,1);*/
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

/*app.post("/comingfrom", async(req,res)=>{
    try{
        const dotNetApiUrl= "https://localhost:7269";
        console.log("Received request body:", req.body);
       // const res = await axios.post('https://localhost:7269/product', initialProduct);
        console.log('Product created successfully:', res.data);
    const newData = {
     
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productType: req.body.productType
    };
    console.log("Sending request toHHHHHHHHHHHHHHHHHHHHH:", dotNetApiUrl);
    console.log("Request dataHHHHHHHHHHHHHHHHHHHHHHHHHHH:", newData);

    const res = await axios.post(dotNetApiUrl + "/product", newData, { headers: { 'Content-Type': 'application/json' }, rejectUnauthorized: false });
    res.json(res.data);
}catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});*/

/*app.post('/resetIds', (req, res) => {
    currentId = 1;
    res.send('IDs reset successfully');
    
});*/

app.listen(PORT, async()=>{
    console.log("Listening to PORT: " + PORT);
});
