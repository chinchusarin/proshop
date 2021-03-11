import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    password: bcrypt.hashSync("123456", 10),
    email: "admin@example.com",
    isAdmin: true
  },
  {
    name: "John Deo",
    password: bcrypt.hashSync("123456", 10),
    email: "johndeo@example.com"
  },
  {
    name: "Adam Leo",
    password: bcrypt.hashSync("123456", 10),
    email: "adamleo@example.com"
  }
];

export default users;
