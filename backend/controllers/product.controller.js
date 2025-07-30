import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

// Export a function called getAllProducts that handles request and response
export const getAllProducts = async (req, res) => {
  try {
    // find all products
    const products = await Product.find({});
    // now display all products in json format
    res.json({ products });
  } catch (error) {
    // for debugging
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export a function called getFeaturedProducts that handles a request and response
export const getFeaturedProducts = async (req, res) => {
  try {
    // Try to get the "featured_products" data from Redis (cache storage)
    let featuredProducts = await redis.get("featured_products");

    // If the data exists in Redis (already cached), return it as JSON
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts)); // Convert string back to object before sending
    }

    // If not in Redis, fetch the featured products from MongoDB
    // .find({ isFeatured: true }) gets only the featured products
    // .lean() makes the query return plain JavaScript objects (faster and lighter)
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    // If no featured products are found in the database, return 404 Not Found
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // Store the fetched products in Redis for next time (as a string)
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    // Return the products to the client as JSON
    res.json(featuredProducts);
  } catch (error) {
    // If something goes wrong, log the error and send a 500 (Server Error) response
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function to create a new product
export const createProduct = async (req, res) => {
  try {
    // Get product details from the request body
    const { name, description, price, image, category } = req.body;

    // Initialize cloudinaryResponse as null
    let cloudinaryResponse = null;

    // If there's an image, upload it to Cloudinary
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products", // Store uploaded image in "products" folder
      });
    }

    // Create a new product in the database with provided data and uploaded image URL
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url // Use image URL if uploaded
        : "", // Else set image as empty string
      category,
    });

    // Return the created product with status code 201 (Created)
    res.status(201).json(product);
  } catch (error) {
    // Log any error and send a 500 Server Error response
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function to delete a product
export const deleteProduct = async (req, res) => {
  try {
    // find the product by id
    const product = await Product.findById(req.params.id);
    // if the product is null then return feedback
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // if product has image then proceed
    if (product.image) {
      // this will get the id of the image
      const publicId = product.image.split("/").pop().split(".")[0];

      try {
        // now delete the image in the cloudinary using destroy
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted image from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error.message);
      }
    }
    // now delete it also from the database using id
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an asynchronous function to get recommended products
export const getRecommendedProducts = async (req, res) => {
  try {
    // Use MongoDB aggregation to get a random sample of 10 products
    const products = await Product.aggregate([
      {
        // Randomly select 10 documents from the Product collection
        $sample: { size: 10 },
      },
      {
        // Project only the specified fields from each product
        $project: {
          _id: 1, // Include the product ID
          name: 1, // Include the product name
          description: 1, // Include the product description
          image: 1, // Include the product image
          price: 1, // Include the product price
        },
      },
    ]);

    // Send the list of recommended products as JSON response
    res.json(products);
  } catch (error) {
    // Log any error that occurs during the process
    console.log("Error in getRecommendedProducts controller", error.message);
    // Respond with status 500 and error message if an error occurs
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function to get products by category
export const getProductsByCategory = async (req, res) => {
  // this gets the category value from the /:category endpoint sent by the client
  const { category } = req.params;
  try {
    // now find all the products in the database that match the given category
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export an async function to toggleFeaturedProducts
export const toggleFeaturedProduct = async (req, res) => {
  try {
    // get the product by finding the id
    const product = await Product.findById(req.params.id);
    // if product is found then run if logic
    if (product) {
      // negate the current value of the isFeatured product
      product.isFeatured = !product.isFeatured;
      // Save the changes made to the product in the database and store the result in updatedProduct var
      const updatedProduct = await product.save();
      // now update the redis cache
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// a async function that is used in the toggleFeaturedProduct function
async function updateFeaturedProductsCache() {
  try {
    // now find all the product that is featured
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    // now update the featured_products in the redis cache and parse is to string
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in update cache function", error);
  }
}
