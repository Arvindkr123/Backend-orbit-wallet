import dotenv from "dotenv";
import path from "path";

// Resolve the root directory and construct the full path to the .env file
const __dirname = path.resolve();
const envPath = path.join(__dirname, ".env");

// Load environment variables
dotenv.config({ path: envPath });

// Debugging to confirm the values are loaded
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("PORT:", process.env.PORT);

// Export the configuration object
const config = {
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
};

export default config;
