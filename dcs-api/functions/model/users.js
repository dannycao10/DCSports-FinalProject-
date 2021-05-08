const mongoose = require('mongoose');
const { users_db } = require('../db');

const usersSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        unc: {
            type: Boolean,
            required: true
        },
        favorite: Array,
        dcs: Number,
    },
    { timestamps: true }
);

const Users = users_db.model('Users', usersSchema);

module.exports = Users;