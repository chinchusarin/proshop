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

const adminUserId = users[0];

console.log(adminUserId);
