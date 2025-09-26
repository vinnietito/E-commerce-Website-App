import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Route for adding a product
productRouter.post('/add',upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}]), addProduct);

// Route for removing a product
productRouter.post('/remove', removeProduct);

// Route for single product info
productRouter.post('/single', singleProduct);

// Route for listing products
productRouter.get('/list', listProducts);


export default productRouter;

