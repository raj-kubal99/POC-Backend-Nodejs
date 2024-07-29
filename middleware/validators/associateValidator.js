const validateCategory = (req, res, next) => {
    const { category } = req.body;

    if ([ category ].includes(null) ||
        [ category ].includes(undefined)) {
        return res.status(400).send("Bad Request: Missing required fields.");
    }

    if (!Number.isInteger(category) || category < 1 || category > 5 ) {
        return res.status(400).send("Bad Request: Invalid data types or content.");
    }

    next();
};

module.exports = { validateCategory };