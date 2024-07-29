// validationMiddleware.js

const isAlpha = (str) => /^[A-Za-z\s]+$/.test(str);

const validateAddDiscount = (req, res, next) => {
    const { offername, category, startDate, expiryDate, isActive } = req.body;
    console.log(req.body);
    console.log("isActive: ",typeof(isActive));
    // Check for null or undefined values
    if ([offername, category, startDate, expiryDate, isActive].includes(null)){
        return res.status(400).send("Bad Request: null fields.");
    }else if([offername, category, startDate, expiryDate, isActive].includes(undefined)) {
        return res.status(400).send("Bad Request: Missing required fields.");
    }
//   
    // Validate data types and content
    if (typeof offername !== 'string' ||
        !Number.isInteger(category) || category < 1 || category > 5 ||
        isNaN(Date.parse(startDate)) || isNaN(Date.parse(expiryDate)) ||
        typeof isActive !== 'boolean' ||
        !isAlpha(offername)) {
        return res.status(400).send("Bad Request: Invalid data types or content.");
    }

    next();
};

const validateEditDiscount = (req, res, next) => {
    const { offername, category, startDate, expiryDate, isActive, id } = req.body;

    if ([offername, category, startDate, expiryDate, isActive, id].includes(null) ||
        [offername, category, startDate, expiryDate, isActive, id].includes(undefined)) {
        return res.status(400).send("Bad Request: Missing required fields.");
    }

    if (typeof offername !== 'string' ||
        !Number.isInteger(category) || category < 1 || category > 5 ||
        isNaN(Date.parse(startDate)) || isNaN(Date.parse(expiryDate)) ||
        typeof isActive !== 'boolean' || typeof id !== 'number' ||
        !isAlpha(offername)) {
        return res.status(400).send("Bad Request: Invalid data types or content.");
    }

    next();
};

module.exports = { validateAddDiscount, validateEditDiscount };