"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
const products = [];
/**
 * @route GET /products
 * @param {Request} - Express request object.
 * @param {Response} - Express response object
 * @returns {void} - Response with products list items
 */
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
/**
 * @route POST /products
 * @param {Request} - Express request object.
 * @param {Response} - Express response object
 * @returns {void} - Response with products list items
 */
productRouter.post("/", (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name,
        product_description,
        product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
/**
 * Get product by id
 *
 * @route GET /products/:id
 * @param { Request } req - Express request object containing id.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with product by id.
 */
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const found = products.find((p) => p.id === id);
    if (!found) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(found);
});
/**
 * Update todo by id
 *
 * @route PUT /products/:id
 * @param { Request } - Express request object which contains id param and todo object.
 * @param { Response } - Express response object.
 * @returns { void } - Respond with updated product object.
 */
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const foundIndex = products.findIndex((p) => p.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updateProduct = Object.assign(Object.assign({}, products[foundIndex]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[foundIndex].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[foundIndex].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[foundIndex].product_price });
    products[foundIndex] = updateProduct;
    res.status(201).json(updateProduct);
});
/**
 * Delete todo by id
 *
 * @route PUT /products/:id
 * @param { Request } - Express request object which contains id param and todo object.
 * @param { Response } - Express response object.
 * @returns { void } - Respond with confirm message.
 */
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex((p) => p.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(foundIndex, 1);
    res.status(200).send("Product deleted");
});
exports.default = productRouter;
