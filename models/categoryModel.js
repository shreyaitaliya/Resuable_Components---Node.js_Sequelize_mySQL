module.exports = (sequelize, DataTypes) => {
    const Catgeory = sequelize.define('category', {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        qty: {    
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        color: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        AddedBy: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false,
    })
    return Catgeory;
}