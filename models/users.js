const mongoose = require('mongoose');
const { project:db } = require('../db/mongo');

const userSchema = new mongoose.Schema(
    {
        username: {
            required: true,
            type: String
        },
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String
        },
        dob: {
            required: false,
            type: String
        },
        timeOfBirth: {
            required: false,
            type: String
        },
        gender: {
            required: true,
            type: String
        },
        maritalStatus: {
            required: false,
            type: String
        },
        avtarLink: {
            required: false,
            type: String
        }
    },
    { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);
userSchema.index({ username: 1, email: 1 });

const userModel = db.model('users', userSchema);

const getUserById = async (id) => {
    return userModel.findOne({_id:id});
}

const getUser = async (query) => {
    const result = await userModel.find(query).lean().exec();
    return result;
}

const saveUser = (data) => {
    return userModel.create(data);
};

const updateUser = (data) => {
    return userModel.findOneAndUpdate({ _id: data.id }, data).lean().exec();
}


module.exports = {
    getUserById,
    getUser,
    saveUser,
    updateUser
}
