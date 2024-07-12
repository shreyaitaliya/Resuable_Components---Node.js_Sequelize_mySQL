module.exports = (sequelize, DataTypes) => {
    const CatgeoryDuplicate = sequelize.define('History_category', {
        categoryHistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
    return CatgeoryDuplicate;
}