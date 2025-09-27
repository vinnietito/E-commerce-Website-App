import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function for add product
const addProduct = async (req,res) => {
    try {
        
        const { name, price, description, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'} );
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product added successfully!"})
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

// Function for list products
const listProducts = async (req,res) => { 


}

// Function for Removing
const removeProduct = async (req,res) => {

}


// Function for single product info
const singleProduct = async (req,res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct } 