const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const testDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");

        const User = mongoose.model("User", new mongoose.Schema({ email: String, name: String }));
        const users = await User.find({});
        console.log("Users in DB:", users.length);
        users.forEach(u => console.log(`- ${u.name} (${u.email})`));

        process.exit();
    } catch (error) {
        console.error("DB Error:", error.message);
        process.exit(1);
    }
};

testDB();
