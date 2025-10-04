import userModel from "../models/userModel"



// add products to user cart
const addToCart = async (req, res) => {

    try {
        
        const { userId, ItemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if

    } catch (error) {
        
    }


}

// update user cart
const updateCart = async (req, res) => {
     

}

// Get user cart data
const getUserCart = async (req, res) => {
     

}

export { addToCart, updateCart, getUserCart }