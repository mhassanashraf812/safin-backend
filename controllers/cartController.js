// import userModel from "../models/userModel.js"


// // add products to user cart
// const addToCart = async (req,res) => {
//     try {
        
//         const { userId, itemId, size } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1
//             }
//             else {
//                 cartData[itemId][size] = 1
//             }
//         } else {
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1
//         }

//         await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json({ success: true, message: "Added To Cart" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }
// const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, size, color, quantity } = req.body;  // Added color to the request body

//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;

//         // Update the quantity for the specific size and color
//         if (cartData[itemId] && cartData[itemId][size] && cartData[itemId][size][color]) {
//             cartData[itemId][size][color] = quantity;  // Update quantity for the specific color
//         } else {
//             res.json({ success: false, message: "Item not found in cart" });
//             return;
//         }

//         // Update the cart data in the database
//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Cart Updated" });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // get user cart data
// const getUserCart = async (req,res) => {

//     try {
        
//         const { userId } = req.body
        
//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         res.json({ success: true, cartData })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

// export { addToCart, updateCart, getUserCart }


import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
	try {
		const { userId, itemId, size, color } = req.body;

		const userData = await userModel.findById(userId);
		let cartData = userData.cartData || [];

		// Check if the item with same size and color already exists
		const existingItem = cartData.find(
			item => item._id === itemId && item.size === size && item.color === color
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartData.push({
				_id: itemId,
				size,
				color,
				quantity: 1
			});
		}

		await userModel.findByIdAndUpdate(userId, { cartData });
		res.json({ success: true, message: "Added To Cart" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

// Update quantity of item in cart
const updateCart = async (req, res) => {
	try {
		const { userId, itemId, size, color, quantity } = req.body;

		const userData = await userModel.findById(userId);
		let cartData = userData.cartData || [];

		const existingItem = cartData.find(
			item => item._id === itemId && item.size === size && item.color === color
		);

		if (existingItem) {
			existingItem.quantity = quantity;
		} else {
			return res.json({ success: false, message: "Item not found in cart" });
		}

		await userModel.findByIdAndUpdate(userId, { cartData });
		res.json({ success: true, message: "Cart Updated" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

// Get user cart data
const getUserCart = async (req, res) => {
	try {
		const { userId } = req.body;

		const userData = await userModel.findById(userId);
		const cartData = userData.cartData || [];

		res.json({ success: true, cartData });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error.message });
	}
};

export { addToCart, updateCart, getUserCart };
