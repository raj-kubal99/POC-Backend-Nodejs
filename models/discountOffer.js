const db = require('../middleware/db');

class DiscountOffer {

    // Create Discount to DB
    static async createDiscount( OfferName, Category, ApplicableFrom, ApplicableTo, IsActive ) {
        try {
            const [result] = await db.query(
                `INSERT INTO DiscountOffers (OfferName, Category, ApplicableFrom, ApplicableTo, IsActive) VALUES (?, ?, ?, ?, ?)`,
                [OfferName, Category, ApplicableFrom, ApplicableTo, IsActive]
            );
            console.log("LOG : INFO : Discount : DB : Discount created with ID=",result.insertId);
            return result.insertId;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Failed to create Discount : error=", error);
            throw error;
        }
    }

    // Get Discount by Offer Name
    static async findDiscount(offerName) {
        try {
            const [rows] = await db.query(`SELECT * FROM DiscountOffers WHERE OfferName = ?`, [offerName]);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Error finding discount by Offername : error=", error);
            throw error;
        }
    }

    // Get Discount by ID
    static async findDiscountByID(id) {
        try {
            const [rows] = await db.query(`SELECT * FROM DiscountOffers WHERE ID = ?`, [id]);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Error finding discount by ID : error=", error);
            throw error;
        }
    }

    // List All Discounts from DB
    static async getAllDiscounts() {
        try {
            const [rows] = await db.query(`SELECT * FROM DiscountOffers`);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Error finding all discount offers : error=", error);
            throw error;
        }
    }

    //  Edit the Discount based on ID
    static async updateDiscount(OfferName, Category, ApplicableFrom, ApplicableTo, IsActive, id) {
        try {
            const [rows] = await db.query(
                `UPDATE DiscountOffers SET OfferName = ?, Category = ?, ApplicableFrom = ?, ApplicableTo = ?, IsActive = ? WHERE ID = ?`,
                [OfferName, Category, ApplicableFrom, ApplicableTo, IsActive, id]
            );
            return true;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Error updating discount offer : error=", error);
            throw error;
        }
    }

    // Deleting a Discount form DB
    static async deleteDiscount(id) {
        try {
            await db.query(`DELETE FROM DiscountOffers WHERE ID = ?`, [id]);
            return true;
        } catch (error) {
            console.error("LOG : ERROR : Discount : DB : Error deleting discount offer : error=", error);
            throw error;
        }
    }
}

module.exports = DiscountOffer;
