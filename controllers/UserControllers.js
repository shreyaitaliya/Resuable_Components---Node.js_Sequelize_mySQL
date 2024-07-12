const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const UserModel = require("../models/UserModel")(sequelize, DataTypes);

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password: hashedPassword });
        return res.status(200).send({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send({
                message: 'Email and Password do not match',
            });
        }
        const userPayload = { id: user.id, name: user.name, email: user.email };
        const token = jwt.sign(userPayload, 'Re-Userable', { expiresIn: '24hr' });
        return res.status(200).send({
            message: 'Login successful',
            token,
            user: userPayload
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = { createUser, loginUser };
