const AssociateOffer = require('../models/associateOffer');

class AssociateOfferController{
    static async getOffers(req, res){
        try{
            console.log("LOG : INFO : Associate Offers : API : Get active Product with Discounts");
            const result = await AssociateOffer.getProductWithDiscounts();
            if (result=="No Active Offers"){
                console.log("LOG : INFO : Associate Offers : API : Get active Product with Discounts : No Active Offers");
                res.status(200).send("No Active Offers");
            }
            else if (!result){
                console.error("LOG : INFO : Associate Offers : API : Get active Product with Discounts : Bad Request");
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send(result);
                console.log("LOG : INFO : Associate Offers : API : Get active Product with Discounts : Success");
            }
        }
        catch(e){
            console.error("LOG : ERROR : Associate Offers : API : Get active Product with Discounts : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    };

    static async getCategoryLists(req, res){
        const {category} = req.body;
        try{
            console.log("LOG : INFO : Associate Offers : API : Get active Product with Discounts");
            const result = await AssociateOffer.getCategoryResult(category);
            console.log(result);
            if (!result){
                console.error("LOG : INFO : Associate Offers : API : Get active Product with Discounts : Bad Request");
                res.status(400).send("Bad Request");
            }
            else{
                res.status(200).send(result);
                console.log("LOG : INFO : Associate Offers : API : Get active Product with Discounts : Success");
            }
        }
        catch(e){
            console.error("LOG : ERROR : Associate Offers : API : Get active Product with Discounts : Internal Server Error : error=",e);
            res.status(500).send("Internal Server Error");
        }
    };

}


module.exports = AssociateOfferController;