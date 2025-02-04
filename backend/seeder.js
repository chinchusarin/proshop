import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Products from "./models/productModel.js";
import Order from "./models/OrderModel.js";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //empty the tables
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // import data
    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUserId };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    //empty the tables
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
