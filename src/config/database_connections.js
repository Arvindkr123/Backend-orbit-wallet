import mongoose from "mongoose";
import config from "./config.js";

const connectionDB = async () => {
    try {
        const res = await mongoose.connect(config.MONGO_URI);
        console.log(`Database connection established at ${res.connection.host}`);
    } catch (error) {
        console.error("Error while connecting to Database:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectionDB;
