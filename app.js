const express = require('express');
// const cors = require('cors')
const app = express();
const port = 8000;

const productRoutes = require('./routes/productRoutes');
const discountRoutes = require('./routes/discountRoutes');


// Middleware
app.use(express.json());
const db = require('./middleware/db');


app.use('/product', productRoutes);
app.use('/discount', discountRoutes);

// Start the server
app.listen(port,()=>{
    console.log(`Server is live on Localhost @ port ${port}`);
});
