const DiscountOffer = require('../models/discountOffer');

class DiscountController{

    /** 
     * Function :   List all the Discount
     * METHOD   :   GET
     * URL      :   http://localhost:8000/discount/
     * RESPONSE :  {
     *              {
                        "id": 3,
                        "OfferName": "Big Billion Day",
                        "Category": 2,
                        "ApplicableFrom": "2024-11-24T18:30:00.000Z",
                        "ApplicableTo": "2024-12-24T18:30:00.000Z",
                        "IsActive": 1
                    },...
                }
    **/  
    static async getDiscount(req, res){
        try{
            console.log("LOG : INFO : Discount : API : Get list of all discount");
            const result = await DiscountOffer.getAllDiscounts();
            if (!result){
                console.error("LOG : INFO : Discount : API : Get list of all discount : Bad Request");
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send(result);
                console.log("LOG : INFO : Discount : API : Get list of all discount : Success");
            }
        }
        catch(e){
            console.error("LOG : ERROR : Discount : API : Get list of all discount : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    };

    /** 
     * Function :   Add Discount to repository
     * METHOD   :   POST
     * URL      :   http://localhost:8000/discount/
     * BODY     :   {
                        "OfferName": "Big Billion Day",
                        "Category": 2,
                        "ApplicableFrom": "2024-11-24T18:30:00.000Z",
                        "ApplicableTo": "2024-12-24T18:30:00.000Z",
                        "IsActive": 1
                    }
     * RESPONSE :   "Data added successfully"
     **/ 
    static async addDiscount(req, res){
        const {offername, category, startDate, expiryDate, isActive} = req.body;

        try{
            console.log("LOG : INFO : Discount : API : Add discount");
            // Check if data is existing first
            const checkData = await DiscountOffer.findDiscount(offername);
            if(checkData.length >0){
                res.status(400).send("Data already Exist");
                console.error("LOG : ERROR : Discount : API : Add discount : Data already exist: Discount name :", offername);
            }
            
            // Add if doesnt exist
            const result = await DiscountOffer.createDiscount(offername, category, startDate, expiryDate, isActive);
            if (!result){
                console.error("Add discount", error);
                res.status(400).send("LOG : ERROR : Discount : API : Add discount : Bad Request");
            }
            else{
                res.status(200).send("Data added successfully");
                console.log("LOG : INFO : Discount : API : Add discount : Success");
            }                   
        }
        catch(e){
            console.error("LOG : ERROR : Discount : API : Add discount : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    }
    
    /** 
     * Function :   Edit Discount from repository
     * METHOD   :   PUT
     * URL      :   http://localhost:8000/discount/
     * REQUEST  :   {
                        "id": 3,
                        "offername": "Big Billion Day",
                        "category": 2,
                        "startDate": "2024-11-24T18:30:00.000Z",
                        "expiryDate": "2024-12-24T18:30:00.000Z",
                        "IsActive": 1
                    }
     * RESPONSE :   "Data edited successfully"
    **/
    static async editDiscount(req, res){
        const {offername, category, startDate, expiryDate, isActive, id} = req.body;
        try{  
            console.log("LOG : INFO : Discount : API : Edit discount");          
            // Check if data is existing first
            const checkData = await DiscountOffer.findDiscountByID(id);
            if(checkData.length < 1){
                res.status(400).send("Data Doesn't Exist to edit");
                console.error("LOG : ERROR : Discount : API : Edit discount : Bad Request : No discount available with name=", offername);
            }

            // Add if exist
            const result = await DiscountOffer.updateDiscount(offername, category, startDate, expiryDate, isActive, id);
            if (!result){
                console.error("LOG : ERROR : Discount : API : Edit discount : Bad Request : error=", error);
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send("Data edited successfully");
                console.log("LOG : INFO : Discount : API : Edit discount : Success");
            }

       
        }
        catch(e){
            console.error("LOG : ERROR : Discount : API : Edit discount : Internal Server Error : error=", e);
            res.status(500).send("Internal Server Error");
        }
    };
}

module.exports = DiscountController;