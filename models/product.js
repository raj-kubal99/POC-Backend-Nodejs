const db = require('../middleware/db');

class Product {

    // Create Product to DB
    static async createProduct(Category, ProductName, Rate, IsActive) {
        try {
            const [result] = await db.query(
                `INSERT INTO Products (Category, ProductName, Rate, IsActive) VALUES (?, ?, ?, ?)`,
                [Category, ProductName, Rate, IsActive]
            );
            console.log("LOG : INFO : Product : DB : Product created with ID=",result.insertId);
            return result.insertId;
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Failed to create Product : error=", error);
            throw error;
        }
    }

    // Get Product by Product Name
    static async findProduct(productName) {
        try {
            const [rows] = await db.query(`SELECT * FROM Products WHERE ProductName = ?`, [productName]);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Error finding Product by productname : error=", error);
            throw error;
        }
    }

    // Get Product by ID
    static async findProductById(id) {
        try {
            const [rows] = await db.query(`SELECT * FROM Products WHERE ID = ?`, [id]);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Error finding Product by ID : error=", error);
            throw error;
        }
    }

    // List all Products from DB
    static async getAllProducts() {
        try {
            const [rows] = await db.query(`SELECT * FROM Products`);
            return rows;
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Error finding all products : error=", error);
            throw error;
        }
    }

    // Edit the Product based on ID
    static async updateProduct(Category, ProductName, Rate, IsActive, id ) {
        try {
            const [rows] = await db.query(
                `UPDATE Products SET Category = ?, ProductName = ?, Rate = ?, IsActive = ? WHERE ID = ?`,
                [Category, ProductName, Rate, IsActive, id]
            );
            return true;
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Error updating Product : error=", error);
            throw error;
        }
    }
    // Deleting a Product form DB
    static async deleteProduct(id) {
        try {
            await db.query(`DELETE FROM Products WHERE ID = ?`, [id]);
        } catch (error) {
            console.error("LOG : ERROR : Product : DB : Error deleting Product : error=", error);
            throw error;
        }
    }
}

module.exports = Product;
