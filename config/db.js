const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Resuable_components', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('db is connected');
    })
    .catch((error) => {
        console.log(error);
        return false;
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const UserModel = require('../models/UserModel')(sequelize, DataTypes);
const categoryModel = require('../models/categoryModel')(sequelize, DataTypes);
const history_categoryModel = require('../models/historyCategoryModel')(sequelize, DataTypes);

db.sequelize.sync()
    .then(() => {
        console.log('re-sync connected');
    })
    .catch((error) => {
        console.log(error);
        return false;
    });

module.exports = db;
