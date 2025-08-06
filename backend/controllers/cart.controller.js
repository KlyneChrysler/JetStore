import Product from "../models/product.model.js";

// Export an async function that can get all cart products or items
export const getCartProducts = async (req, res) => {
  try {
    // get the id in the cart items and store it on products var
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    // add quantity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function that can add to cart
export const addToCart = async (req, res) => {
  try {
    // get the product id from the req.body object and store it in productId var
    const { productId } = req.body;
    // now get the user from the authentication middleware and store it in user var
    const user = req.user;
    // Check if the product is already in the cart by comparing IDs and store it in ExistingItem var
    const existingItem = user.cartItems.find((item) => item.id === productId);
    // if existingItem is not null or true then run if
    if (existingItem) {
      // increment the item quantity
      existingItem.quantity += 1;
    } else {
      // if existingItem is null then add a new product to cart
      user.cartItems.push(productId);
    }
    // then save it to the mongodb database
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function that can remove all from cart
export const removeAllFromCart = async (req, res) => {
  try {
    // get the product id from the req.body object and store it in productId var
    const { productId } = req.body;
    // now get the user from the authentication middleware and store it in user var
    const user = req.user;
    // if the product id is not found in the cart then
    if (!productId) {
      // return cart same as before // cart not touched
      user.cartItems = [];
    } else {
      // If a product with the same ID is found in the cart, remove it and keep all other items that don’t match that ID
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    // and save the user to the database
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params; // I'm getting the product ID from the URL parameters
    const { quantity } = req.body; // Now I’m grabbing the new quantity from the request body
    const user = req.user; // I'm accessing the logged-in user from the request

    // I’m checking if the product already exists in the user's cart
    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      // If the quantity is 0, I want to remove this item from the cart
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId); // I’m filtering out the item to remove it
        await user.save(); // I save the updated cart to the database
        return res.json(user.cartItems); // Then I send back the updated cart
      }

      // Otherwise, I just update the item's quantity
      existingItem.quantity = quantity;
      await user.save(); // I save the changes to the database
      return res.json(user.cartItems); // Then return the updated cart
    } else {
      // If the product wasn't found in the cart, I return a 404 error
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    // If something goes wrong, I log the error and return a server error message
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
