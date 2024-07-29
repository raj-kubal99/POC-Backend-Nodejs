class Cart {
    constructor(id, category, productName, rate, isActive) {
        this.id = id;
        this.category = category;
        this.productName = productName;
        this.rate = rate;
        this.isActive = isActive;
        this.offerNames = []; // List to store offer names
    }

    addOffer(offerName) {
        this.offerNames.push(offerName);
    }
}

module.exports = Cart;