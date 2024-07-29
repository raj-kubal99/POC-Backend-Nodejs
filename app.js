const express = require('express');
// const cors = require('cors')
const app = express();
const port = 8000;

const productRoutes = require('./routes/productRoutes');
const discountRoutes = require('./routes/discountRoutes');
const associateRoutes = require('./routes/associateRoutes');

// Middleware
app.use(express.json());
const db = require('./middleware/db');


app.use('/product', productRoutes);
app.use('/discount', discountRoutes);
app.use('/product-sale', associateRoutes);

// Start the server
app.listen(port,()=>{
    console.log(`Server is live on Localhost @ port ${port}`);
});
