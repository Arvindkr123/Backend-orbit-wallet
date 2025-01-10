import TransectionModel from "../models/transections.models.js";
import mongoose from 'mongoose';
import UserModel from "../models/users.models.js";
const { ObjectId } = mongoose.Types;

export const getUserTransactionsController = async (req, res) => {
    try {
        const { status, type, fromDate, toDate } = req.query;
        const { userId } = req.params;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid userId'
            });
        }

        const filters = { userId: new ObjectId(userId) };

        // Add filters for status and type
        if (status) {
            filters.status = status;
        }

        if (type) {
            filters.type = type;
        }

        // Validate and filter by dates
        if (fromDate || toDate) {
            filters.transectionsDate = {};
            if (fromDate) {
                if (isNaN(new Date(fromDate).getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid fromDate format'
                    });
                }
                filters.transectionsDate.$gte = new Date(fromDate);
            }

            if (toDate) {
                if (isNaN(new Date(toDate).getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid toDate format'
                    });
                }
                filters.transectionsDate.$lte = new Date(toDate);
            }
        }

        const transcations = await TransectionModel.aggregate([
            {
                $match: filters
            },
            {
                $lookup: {
                    from: UserModel.collection.name, // Use dynamic collection name
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    status: 1,
                    type: 1,
                    transectionsDate: 1,
                    amount: 1,
                    userDetails: {
                        name: 1,
                        phoneNumber: 1
                    }
                }
            }
        ]);

        if (transcations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No transactions found for the given filters'
            });
        }

        res.status(200).json({
            success: true,
            transcations
        });
    } catch (error) {
        console.error('Error fetching transactions:', error); // Log error for debugging
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }
};






export const getTransactionsController = async (req, res) => {
    try {
        const { status, type, fromDate, toDate, limit = 10, page = 1 } = req.query;
        const match = {};

        if (status) {
            match.status = status;
        }
        if (type) {
            match.type = type;
        }


        if (fromDate || toDate) {
            match.transectionsDate = {};
            if (fromDate) {
                match.transectionsDate.$gte = new Date(fromDate);
            }
            if (toDate) {
                match.transectionsDate.$lte = new Date(toDate);
            }
        }

        const transcations = await TransectionModel.aggregate(
            [
                {
                    $match: match
                },
                {
                    $sort: { transectionsDate: -1 }
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: (page - 1) * limit
                            },
                            {
                                $limit: parseInt(limit)
                            }
                        ],
                        total: [{ $count: 'count' }]
                    }
                }
            ]
        )

        const totalTransactions = transcations[0]?.total[0]?.count || 0;

        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalTransactions / limit),
            totalTransactions,
            data: transcations[0].data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while getting transcations data'
        });
    }
}