import UserModels from "../models/users.models.js";

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModels.findOne({
            _id: id
        });
        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong' || error.message
        })
    }
}