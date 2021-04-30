const path = require('path');
const express = require('express');
const Users = require('../model/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mongoose = require('mongoose');
const Router = express.Router();
const constants = require('../constants.js');

Router.post('/userCreate',
    async (req, res) => {
        try {
            let existing;
            let { username, password, fname, lname, city, state, unc, favorite, dcs } = req.body;
            await Users.exists({ "username": username }).then(async exists => {
                existing = exists;
                if (exists) return res.status(400).send("Username already exists. Enter another one.");
            });
            if (!existing) {
                let salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt);
                const user = new Users({
                    username,
                    password,
                    fname,
                    lname,
                    city,
                    state,
                    unc,
                    favorite,
                    dcs,
                });
                console.log("Successfully signed up " + existing.username)
                await user.save();
                return res.send(user).status(200);
            }
        } catch (err) {
            console.log(err);
            return res.send('Error while creating new user').status(400);
        }
    }
);

Router.post('/validateToken', async (req, res) => {
    try {
        // const token = req.body["auth-token"];
        const token = req.header("auth-token");
        if (!token) { return res.send(false).status(400); }
        const verified = jwt.verify(token, constants.jwt_pass);
        if (!verified) { return res.send(false).status(400); }
        
        let existing;
        await Users.findById(verified.id, (err, user) => {
            if (err) {
                return res.send(false).status(400);
            }
            existing = user;
            if (user != null) {
                return res.status(200).send({
                    valid: true,
                    token: token,
                    user: existing
                });
            }
        })
    } catch (err) {
        console.log(err);
        return res.send("Could not validate token").status(304);
    }
})

Router.post('/login', async (req, res) => {
    try {
        let existing;
        let token;
        let { username, password } = req.body;
        await Users.findOne({ username }).then(async (user, err) => {
            if (err) return res.send("Error finding user").status(400);
            if (user != null) {
                await bcrypt.compare(password, user.password).then(resp => {
                    if (!resp) return res.status(400).send('Invalid password. Nice try, bot.');
                    else {
                        const t = jwt.sign({ id: user._id }, constants.jwt_pass);
                        token = t;
                        delete user.password;
                        return res.status(200).send({
                            token,
                            existing: user
                        });
                    }
                });
            }
            existing = user;
        })
        console.log("Successfully logged in " + existing.username)
    } catch (err) {
        return res.status(400).send("Error logging in. Please try again.");
    }
});

// Router.get("/:id", async (req, res) => {
//     const userId = req.params.id;
//     Users.findOne({ _id: new Mongoose.Types.ObjectId(userId.toString()) }, function (error, result) {
//       if (error) throw error;
//       return res.json({
//         username: result.username,
//         fname: result.fname,
//         lname: result.lname,
//         city: result.city,
//         state: result.state,
//         unc: result.unc,
//         favorite: result.favorite,
//         dcs: result.dcs,
//       });
//     });
// });

module.exports = Router;