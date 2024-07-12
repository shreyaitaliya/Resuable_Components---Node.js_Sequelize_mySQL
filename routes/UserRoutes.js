const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserControllers');
const { CreateUserSchema, loginSchema } = require('../middelware/Schemas/userSchema');
const validate = require('../middelware/validate');

routes.post('/users', validate(CreateUserSchema), UserController.createUser)

routes.post('/login', validate(loginSchema), UserController.loginUser)

module.exports = routes;