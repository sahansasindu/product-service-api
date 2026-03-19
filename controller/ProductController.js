const ProductSchema = require('../model/ProductSchema');

const createProduct = async (request, response) => {

    try {
        const { productName, actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;

        if (!productName || !actualPrice || !qty || !description || !categoryId) {
            return response.status(400).json({ code: 400, message: 'some field are missing!....', data: null })
        }
        //  // Validate numeric fields
        // if (isNaN(actualPrice) || isNaN(oldPrice) || isNaN(qty) || isNaN(discount)) {
        //     return response.status(400).json({
        //         code: 400,
        //         message: 'Price, quantity, and discount must be valid numbers',
        //         data: null
        //     });
        // }

        let imagesArray = [];
        if (request.files && request.files.length > 0) {
            imagesArray = request.files.map(file => `/uploads/products/${file.filename}`);
        }

        const product = new ProductSchema({
            productName: productName,
            images: imagesArray,
            actualPrice: parseFloat(actualPrice),
            oldPrice: parseFloat(oldPrice),
            qty: qty,
            description: description,
            discount: discount,
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const saveData = await product.save();
        console.log(saveData);
        return response.status(201).json({ code: 201, message: 'product has been saved..', data: saveData })

    } catch (err) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }

}
const updateProduct = async (request, response) => {

    try {
        const { productName, actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;

        const updateFields = {};
        if (productName) updateFields.productName = productName;
        if (actualPrice) updateFields.actualPrice = actualPrice;
        if (oldPrice) updateFields.oldPrice = oldPrice;
        if (qty !== undefined) updateFields.qty = qty;
        if (description) updateFields.description = description;
        if (discount) updateFields.discount = discount;
        if (categoryId) updateFields.categoryId = categoryId;

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ code: 400, message: 'No fields provided for update!....', data: null });
        }

        const updateData = await ProductSchema.findOneAndUpdate(
            { '_id': request.params.id },
            { $set: updateFields },
            { new: true });

        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Product not found...', data: null });
        }

        return response.status(200).json({ code: 200, message: 'product has been updated..', data: updateData });

    } catch (err) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }


}
const deleteProduct = async (request, response) => {
    try {

        if (!request.params.id) {
            return response.status(400).json({
                code: 400,
                message: 'some field are missing!....',
                data: null
            });
        }
        const deletedData = await ProductSchema.findOneAndDelete(
            { '_id': request.params.id });

        if (deletedData) {
            return response.status(200).json({ code: 200, message: 'product has been deleted successfully', data: deletedData })
        } else {
            return response.status(404).json({ code: 404, message: 'product not found', data: null })
        }

    } catch (err) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findProductById = async (request, response) => {
    try {

        if (!request.params.id) {
            return response.status(400).json({
                code: 400,
                message: 'some field are missing!....',
                data: null
            });
        }
        const productData = await ProductSchema.findById(
            { '_id': request.params.id });
        if (productData) {
            return response.status(200).json({ code: 200, message: 'product data..', data: productData });
        }

        response.status(404).json({ code: 404, message: 'product data not found...', error: err.message });


    } catch (err) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });
    }
}
const findAllProduct = async (request, response) => {

    try {

        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = { $search: searchText }
        }
        const skip = (pageIndex - 1) * pageSize;
        const productList = await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const productListCount = await ProductSchema.countDocuments();
        return response.status(200).json({ code: 200, message: 'product data..', data: { list: productList, productListCount } })


    } catch (err) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error: err.message });

    }
}

module.exports = {
    createProduct, updateProduct, deleteProduct, findAllProduct, findProductById
}