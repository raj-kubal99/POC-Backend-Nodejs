// const productModel = require('../models/productModel')
const db = require('../middleware/db');

const getProducts = (req, res) => {
    try{
        db.query("Select * from Products", (error,result)=>{
            if (error){
                console.log("DB : Error fetching data from table");
                res.status(400).send("Bad Request")
            }
            else{
                console.log("Data: ", result);
                res.status(200).send(result)
            }
        });
    }catch(e){
        res.status(500).send("Internal server error");
    }

}

const editProduct = (req, res) => {
    const userData = req.body;
    try{
        const querydata = [userData.category, userData.productName ];
        
        // Check if data is existing first
        db.query("Select * from products where productName=?",[userData.productName], (error,result)=>{
            if (error){
                console.log("DB : Error Checking Product: ", error);
                res.status(400).send("Bad Request");
            }
            else if(result.length < 1){
                res.status(400).send("Data Doesn't Exist to edit");
                console.log("Product: Edit : Data does not exist: Product name :",userData.productName);
            }
            else{
                // Add if exist
                db.query("Update Products set category=? where productName=?", querydata, (error,result)=>{
                    if (error){
                        console.log("DB : Error editing Product: ", error);
                        res.status(400).send("Bad Request");
                    }
                    else{
                        res.status(200).send("Data edited successfully");
                        console.log("Product: Edit : Product name :",userData.productName);
                    }
                });
            }
        });        
    }
    catch(e){
        console.log("Error : Product : Edit  : ",e);
        res.status(500).send("Internal Server Error");
    }
};

const addProduct = (req, res) => {
    const userData = req.body;
    try{
        const querydata = [userData.category, userData.productName, userData.rate, userData.isActive];
        
        // Check if data is existing first
        db.query("Select * from products where Productname=?",[userData.productName], (error,result)=>{
            if (error){
                console.log("DB : Error Checking Product: ", error);
                res.status(400).send("Bad Request");
            }
            else if(result.length > 0){
                res.status(400).send("Data already exist");
                console.log("Product: Add : Data already exists: Product name :",userData.productName);
            }
            else{
                // Add if exist
                db.query("Insert into products(category, productName, rate, isActive) values(?, ?, ?, ?);", querydata, (error,result)=>{
                    if (error){
                        console.log("DB : Error adding Product: ", error);
                        res.status(400).send("Bad Request");
                    }
                    else{
                        res.status(200).send("Data added successfully");
                        console.log("Product: Add : Product name :",userData.productName);
                    }
                });
            }
        });        
    }
    catch(e){
        console.log("Error : Product : Add  : ",e);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    getProducts, addProduct, editProduct
};