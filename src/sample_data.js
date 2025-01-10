import mongoose from "mongoose";
import UserModels from "./models/users.models.js";
import TransectionModel from "./models/transections.models.js";

const users = [
    {
        name: "John Doe",
        phoneNumber: "1234567890",
    },
    {
        name: "Jane Smith",
        phoneNumber: "9876543210",
    },
    {
        name: "Alice Johnson",
        phoneNumber: "5678901234",
    },
    {
        name: "Bob Brown",
        phoneNumber: "4567890123",
    },
    {
        name: "Charlie Wilson",
        phoneNumber: "7890123456",
    },
    {
        name: "David Miller",
        phoneNumber: "2345678901",
    },
    {
        name: "Emily Davis",
        phoneNumber: "8901234567",
    },
    {
        name: "Frank Thomas",
        phoneNumber: "3456789012",
    },
    {
        name: "Grace Lee",
        phoneNumber: "6789012345",
    },
    {
        name: "Hannah White",
        phoneNumber: "9012345678",
    },
];

const transactions = [
    {
        status: "success",
        type: "credit",
        transactionDate: new Date("2024-01-01T12:00:00.000Z"),
        amount: 500,
        userId: null, // Placeholder for the actual userId
    },
    {
        status: "failed",
        type: "debit",
        transactionDate: new Date("2024-01-02T14:00:00.000Z"),
        amount: 200,
        userId: null,
    },
    {
        status: "pending",
        type: "credit",
        transactionDate: new Date("2024-01-03T16:00:00.000Z"),
        amount: 300,
        userId: null,
    },
    // Add more transactions as needed
];

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://127.0.0.1:27017/orbitWallet");

        console.log("Connected to MongoDB");

        // Clear existing data
        await UserModels.deleteMany({});
        await TransectionModel.deleteMany({});

        // Insert users
        const insertedUsers = await UserModels.insertMany(users);

        // Map transactions to the inserted users
        const transactionsWithUserIds = transactions.map((transaction, index) => {
            return {
                ...transaction,
                userId: insertedUsers[index % insertedUsers.length]._id, // Distribute transactions among users
            };
        });

        // Insert transactions
        await TransectionModel.insertMany(transactionsWithUserIds);

        console.log("Data inserted successfully");
        process.exit();
    } catch (error) {
        console.error("Error inserting data:", error.message);
        process.exit(1);
    }
};

seedData();
