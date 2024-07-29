const db = require('../middleware/db');
const Cart = require('./Cart');

class AssociateOffer {

    // Get Product and Offers based on category
    static async getCategoryResult(category){
        try {
            const prod = await db.query(`SELECT * FROM Products WHERE Category=?`,[category]);
            const offers = await db.query(`SELECT * FROM DiscountOffers WHERE Category=?`,[category]);
            return {
                products: prod[0],
                offers: offers[0]
              };
        } catch (error) {
            console.error("LOG : ERROR : Associate Offers : DB : Failed to get category based Product and Discount : error=", error);
            throw error;
        }
    } 

    // Get all products and their discounts
    static async getProductWithDiscounts() {
        try {
            const query = `
                SELECT p.ID, p.Category, p.ProductName, p.Rate, p.IsActive, d.OfferName
                FROM Products p
                JOIN DiscountOffers d ON p.Category = d.Category
                WHERE p.IsActive = true AND d.IsActive = true;
            `;
            const result = await db.query(query);
            if (!result[0]){
                return "No Active Offers";
            }
            else{
                const productMap = new Map();
                console.log("RAJ OUTPUT:: result :", result);
                console.log("RAJ DEBUG : result DONE");

                result[0].forEach(row => {
                    if (!productMap.has(row.ID)) {
                        const product = new Cart(row.ID, row.Category, row.ProductName, row.Rate, row.IsActive);
                        product.addOffer(row.OfferName);
                        productMap.set(row.ID, product);
                    } else {
                        productMap.get(row.ID).addOffer(row.OfferName);
                    }
                });
                const products = Array.from(productMap.values());
                console.log("RAJ DEBUG : PRODUCTS", products);
                console.log("RAJ DEBUG : PRODUCTS DONE");
                return products;
            }
        } catch (error) {
            console.error("LOG : ERROR : Associate Offers : DB : Failed to get Product and its Discount : error=", error);
            throw error;
        }
    }
}

module.exports = AssociateOffer;