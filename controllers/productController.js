const Product = require('../models/product')

class ProductController{

    /** 
     * Function :   List all the Products
     * METHOD   :   GET
     * URL      :   http://localhost:8000/product/
     * RESPONSE :  {
     *              {
                        "id": 2,
                        "category": 4, 
                        "productName": "Oneplus Nord 2T", 
                        "rate": 30000, 
                        "isActive": false
                    },...
                }
    **/ 
    static async getProducts(req, res){
        try{
            console.log("LOG : INFO : Product : API : Get list of all Product");
            const result = await Product.getAllProducts();
            if (!result){
                console.error("LOG : INFO : Product : API : Get list of all Product : Bad Request");
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send(result);
                console.log("LOG : INFO : Product : API : Get list of all Product : Success");
            }
        }
        catch(e){
            console.error("LOG : ERROR : Product : API : Get list of all Product : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    };
 
    /** 
     * Function :   Add Product to repository
     * METHOD   :   POST
     * URL      :   http://localhost:8000/product/
     * BODY     :   {
                        "category": 4, 
                        "productName": "Oneplus Nord 2T", 
                        "rate": 30000, 
                        "isActive": false
                    }
     * RESPONSE :   "Data added successfully"
     **/
    static async addProduct(req, res){
        const {category, productName, rate, isActive} = req.body;
        try{
            console.log("LOG : INFO : Product : API : Add Product");
            // Check if data is existing first
            const checkData = await Product.findProduct(productName);
            if(checkData.length >0){
                res.status(400).send("Data already Exist");
                console.error("LOG : ERROR : Product : API : Add Product : Data already exist: Product name :", productName);
            }
            
            // Add if doesnt exist
            const result = await Product.createProduct(category, productName, rate, isActive);
            if (!result){
                console.error("Add Product", error);
                res.status(400).send("LOG : ERROR : Product : API : Add Product : Bad Request");
            }
            else{
                res.status(200).send("Data added successfully");
                console.log("LOG : INFO : Product : API : Add Product : Success");
            }                   
        }
        catch(e){
            console.error("LOG : ERROR : Product : API : Add Product : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    };

    /** 
     * Function :   Edit Product from repository
     * METHOD   :   PUT
     * URL      :   http://localhost:8000/product/
     * REQUEST  :   {
                        "id": 2,
                        "category": 4, 
                        "productName": "Oneplus Nord 2T", 
                        "rate": 30000, 
                        "isActive": false
                    }
     * RESPONSE :   "Data edited successfully"
    **/
    static async editProduct(req, res){
        const {category, productName, rate, isActive, id } = req.body;
        try{  
            console.log("LOG : INFO : Product : API : Edit Product");          
            // Check if data is existing first
            const checkData = await Product.findProductById(id);
            if(checkData.length < 1){
                res.status(400).send("Data Doesn't Exist to edit");
                console.error("LOG : ERROR : Product : API : Edit Product : Bad Request : No Product available with name=", productName);
            }

            // Add if exist
            const result = await Product.updateProduct(category, productName, rate, isActive, id );
            if (!result){
                console.error("LOG : ERROR : Product : API : Edit Product : Bad Request : error=", error);
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send("Data edited successfully");
                console.log("LOG : INFO : Product : API : Edit Product : Success");
            }

       
        }
        catch(e){
            console.error("LOG : ERROR : Product : API : Edit Product : Internal Server Error : error=", e);
            res.status(500).send("Internal Server Error");
        }
    };
}

module.exports = ProductController;