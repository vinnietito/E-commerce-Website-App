import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/productController.js";

const productRouter = express.Router();

// Route for adding a product
productRouter.post('/add', addProduct);

// Route for removing a product
productRouter.post('/remove', removeProduct);

// Route for single product info
productRouter.post('/single', singleProduct);

// Route for listing products
productRouter.get('/list', listProducts);


export default productRouter;

