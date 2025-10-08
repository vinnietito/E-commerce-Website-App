import userModel from "../models/userModel.js"



// add products to user cart
const addToCart = async (req, res) => {

    try {
        
        const { userId, ItemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"Item added to cart!"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})

    }


}

// update user cart
const updateCart = async (req, res) => {
    try {
        
        const { userId, ItemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"Cart Updated"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
     

}

// Get user cart data
const getUserCart = async (req, res) => {
     

}

export { addToCart, updateCart, getUserCart }