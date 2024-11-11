import express, {Request, Response} from 'express';
import mainConfig from "./config/mainConfig";
import productRoutes from "./api/v1/routes/productRoutes";
import categoryRoutes from "./api/v1/routes/categoryRoutes";
import customerRoutes from "./api/v1/routes/customerRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";
import orderItemRoutes from "./api/v1/routes/orderItemRoutes";

const app = express();
const PORT: number = mainConfig.port;


/**
 *
 * @TODO write the documentation
 * @TODO Add Docker file
 * @TODO Add To gitHub
 * @TODO send the email
 *
 */

// Using json
app.use(express.json());


// Using multipart forms
app.use(express.urlencoded({ extended: true }));

// Products routes
app.use('/api/v1/products', productRoutes);

// Categories routes
app.use('/api/v1/categories',categoryRoutes);

// Customer routes
app.use('/api/v1/customers',customerRoutes);

// Order routes
app.use('/api/v1/orders',orderRoutes);

// Item order routes
app.use('/api/v1/orderItems',orderItemRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
