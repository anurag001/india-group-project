const mongoose = require('mongoose');
const { project:db } = require('../db/mongo');

const feedSchema = new mongoose.Schema(
    {
        headline: {
            required: true,
            type: String
        },
        category: {
            required: true,
            type: String
        },
        authorName: {
            required: true,
            type: String,
        },
        thumbnailLink: {
            required: false,
            type: String
        }
    },
    { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);
feedSchema.index({headline: 'text'});
const feedsModel = db.model('feeds', feedSchema);

const listFeeds = async (data) => {
    const { filters = {}, start = 0, perPage: end = 10, order_by = 1 } = data;
    return await feedsModel.find(filters).limit(end).skip(start).sort({createdAt:order_by}).lean().exec();
};

const searchFeeds = async (searchString) => {
    return feedsModel.find({$text: {$search: searchString}}).sort({createdAt:1}).lean().exec();
}

module.exports = {
    listFeeds,
    searchFeeds
};
