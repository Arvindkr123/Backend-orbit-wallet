import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields automatically
    }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
