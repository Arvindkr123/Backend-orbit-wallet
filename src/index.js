import app from "./app.js";
import config from "./config/config.js";
import connectionDB from "./config/database_connections.js";

const startServer = async () => {
    try {
        // Establish database connection
        await connectionDB();
        // console.log("Database connected successfully.");

        // Start the server
        app.listen(config.PORT, () => {
            console.log(`Server running on: http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Call the function to start the server
startServer();
