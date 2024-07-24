
const db = require('../middleware/db');

const getDiscount = (req, res) => {
    try{
        db.query("Select * from discountOffers", (error,result)=>{
            if (error){
                console.log("DB : Error getting Discount data: ", error);
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send(result);
                console.log("Discount: Get :",result);
            }
        });
    }
    catch(e){
        console.log("Error : Discount : Get  : ",e);
        res.status(500).send("Internal Server Error");
    }
};

const addDiscount = (req, res) => {
    const userData = req.body;
    console.log(userData);
    try{
        const querydata = [userData.offername, userData.category, userData.StartDate, userData.expiryDate, userData.isActive];
        
        // Check if data is existing first
        db.query("Select * from discountOffers where offername=?",[userData.offername], (error,result)=>{
            if (error){
                console.log("Error Checking Discount: ", error);
                res.status(400).send("Bad Request");
            }
            else if(result.length >0){
                res.status(400).send("Data already Exist");
                console.log("Discount: Add : Data already exist: Discount name :",userData.offername);
            }
            else{
                // Add if doesnt exist
                db.query("Insert into discountOffers(offername,category,Applicablefrom, Applicableto,isActive) values (?, ?, ?, ?, ?)", querydata, (error,result)=>{
                    if (error){
                        console.log("Error adding Discount: ", error);
                        res.status(400).send("Bad Request");
                    }
                    else{
                        res.status(200).send("Data added successfully");
                        console.log("Discount: Add : Discount name :",userData.offername);
                    }
                });
            }
        });        
    }
    catch(e){
        console.log("Error : Discount : Add  : ",e);
        res.status(500).send("Internal Server Error");
    }

}

const editDiscount = (req, res) => {
    const userData = req.body;
    try{
        const querydata = [userData.offername, userData.category];
        
        // Check if data is existing first
        db.query("Select * from discountOffers where offername=?",[userData.offername], (error,result)=>{
            if (error){
                console.log("DB : Error Checking Discount: ", error);
                res.status(400).send("Bad Request");
            }
            else if(result.length < 1){
                res.status(400).send("Data Doesn't Exist to edit");
                console.log("Discount: Edit : Data does not exist: Discount name :",userData.offername);
            }
            else{
                // Add if exist
                db.query("Update discountOffers set category=? where offername=?", querydata, (error,result)=>{
                    if (error){
                        console.log("DB : Error editing Discount: ", error);
                        res.status(400).send("Bad Request");
                    }
                    else{
                        res.status(200).send("Data edited successfully");
                        console.log("Discount: Edit : Discount name :",userData.offername);
                    }
                });
            }
        });        
    }
    catch(e){
        console.log("Error : Discount : Edit  : ",e);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    addDiscount, getDiscount, editDiscount
};