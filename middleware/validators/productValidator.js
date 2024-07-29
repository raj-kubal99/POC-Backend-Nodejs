// validationMiddleware.js

const isAlpha = (str) => /^[A-Za-z\s]+$/.test(str);

const validateAddProducts = (req, res, next) => {
    const { productName, category, rate, isActive } = req.body;

    // Check for null or undefined values
    if ([productName, category, rate, isActive].includes(null) ||
        [productName, category, rate, isActive].includes(undefined)) {
        return res.status(400).send("Bad Request: Missing required fields.");
    }

    // Validate data types and content
    if (typeof productName !== 'string' ||
        !Number.isInteger(category) || category < 1 || category > 5 ||
        Number.isInteger(rate) ||
        typeof isActive !== 'boolean' ||
        !isAlpha(productName)) {
        return res.status(400).send("Bad Request: Invalid data types or content.");
    }

    next();
};

const validateEditProducts = (req, res, next) => {
            productName, category, rate,      isActive, id 
    const { productName, category, rate, isActive, id } = req.body;

    if ([productName, category, rate,  isActive, id].includes(null) ||
        [productName, category, rate,  isActive, id].includes(undefined)) {
        return res.status(400).send("Bad Request: Missing required fields.");
    }

    if (typeof productName !== 'string' ||
        !Number.isInteger(category) || category < 1 || category > 5 ||
        !Number.isInteger(rate) ||
        typeof isActive !== 'boolean' || typeof id !== 'number' ||
        !isAlpha(productName)) {
        return res.status(400).send("Bad Request: Invalid data types or content.");
    }

    next();
};

module.exports = { validateAddProducts, validateEditProducts };
