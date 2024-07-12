const { DataTypes, Op, where } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;
const categoryModel = require('../models/categoryModel')(sequelize, DataTypes);
const duplicateCategoryModel = require('../models/historyCategoryModel')(sequelize, DataTypes);

const addCategory = async (req, res) => {
    try {
        const { categoryname, qty, price, description, color } = req.body;
        let AddedBy = req.user.name;

        const duplicate = await categoryModel.findOne({ where: { categoryname: categoryname } });

        if (duplicate) {
            console.log('Category already exists');
            return res.status(400).send({
                message: 'Category already exists'
            });
        }

        // Create new category
        const category = await categoryModel.create({ categoryname, categoryname, qty, price, description, color, AddedBy });
        return res.status(200).send({
            message: 'Category added successfully',
            category: category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An error occurred while adding the category',
            error: error.message
        });
    }
};

const getCategory = async (req, res) => {
    try {
        let { page, size, search } = req.query;

        // Set default values if page or size are not provided
        page = page ? parseInt(page, 10) : 1;
        size = size ? parseInt(size, 10) : 20;

        // Ensure size is within acceptable limits
        size = size <= 100 ? size : 20;

        // Calculate limit and offset
        const limit = size;
        const offset = (page - 1) * limit;

        // Initialize where condition
        const whereCondition = {};
        if (search) {
            whereCondition[Op.or] = [
                { categoryname: { [Op.like]: `%${search}%` } }
            ];
        }

        //Total Record In Database
        const totaldatabaseRecord = await categoryModel.count();

        // Retrieve categories from the database
        const { count, rows } = await categoryModel.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
        });

        return res.status(200).send({
            success: true,
            message: 'Categories Retrieved Successfully...',
            data: rows,
            DataBaseTotalRecord: totaldatabaseRecord,
            TotalRecord: count,
            CurrentPage: page
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An error occurred while fetching the categories',
            error: error.message
        });
    }
};

const GetByIdCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if id is undefined or null
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Missing or invalid category ID in request parameters'
            });
        }

        const category = await categoryModel.findOne({
            where: { categoryID: id }
        });

        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category Not Found...'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Category Retrieved Successfully...',
            data: category
        });

    } catch (error) {
        console.error('Error retrieving category:', error);
        return res.status(500).send({
            message: 'An error occurred while fetching the category',
            error: error.message
        });
    }
}


const UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { categoryname, qty, price, description, color } = req.body;
        const AddedBy = req.user.name;

        const findcategory = await categoryModel.findByPk(id);

        if (!findcategory) {
            return res.status(404).send({
                success: false,
                message: 'Category Not Found...',
            });
        }

        // Create a duplicate category
        const history = await duplicateCategoryModel.create({
            categoryID: findcategory.categoryID,
            categoryname: findcategory.categoryname,
            qty: findcategory.qty,
            price: findcategory.price,
            description: findcategory.description,
            color: findcategory.color,
            AddedBy: findcategory.AddedBy,
        });
        // console.log(duplicate);

        // Update the Category
        findcategory.categoryname = categoryname
        findcategory.qty = qty
        findcategory.price = price
        findcategory.description = description
        findcategory.color = color;
        await findcategory.save();

        return res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            data: findcategory
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An error occurred while updating the category',
            error: error.message
        });
    }
}

const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const GetCategory = await categoryModel.findOne({ where: { categoryID: id } });

        if (!GetCategory) {
            return res.status(404).send({
                message: 'Category not found'
            });
        }
        // console.log(GetCategory);

        const history = await duplicateCategoryModel.create(GetCategory.dataValtnuues)
        // console.log(duplicate);
        if (!history) {
            return res.status(500).send({
                success: false,
                message: 'Duplicate Category Can Not Add In Table...'
            })
        }

        await GetCategory.destroy();

        return res.status(200).send({
            success: true,
            message: 'Category Delete Successfully...'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'An Error Occurred While Deleting The Category',
            error: error.message
        })
    }
}

module.exports = {
    addCategory, getCategory, GetByIdCategory, UpdateCategory, DeleteCategory
};
