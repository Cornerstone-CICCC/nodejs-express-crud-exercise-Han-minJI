import { Router, Request, Response } from "express";
import { Product } from "../types/product";
import { v4 as uuidv4 } from "uuid";

const productRouter = Router();

const products: Product[] = [];

/**
 * @route GET /products
 * @param {Request} - Express request object.
 * @param {Response} - Express response object
 * @returns {void} - Response with products list items
 */
productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});

/**
 * @route POST /products
 * @param {Request} - Express request object.
 * @param {Response} - Express response object
 * @returns {void} - Response with products list items
 */
productRouter.post(
  "/",
  (req: Request<{}, {}, Omit<Product, "id">>, res: Response) => {
    const { product_name, product_description, product_price } = req.body;
    const newProduct: Product = {
      id: uuidv4(),
      product_name,
      product_description,
      product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  },
);

/**
 * Get product by id
 *
 * @route GET /products/:id
 * @param { Request } req - Express request object containing id.
 * @param { Response } res - Express response object.
 * @returns { void } - Responds with product by id.
 */

productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
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
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Partial<Product>>, res: Response) => {
    const { id } = req.params;
    const foundIndex = products.findIndex((p) => p.id === id);
    if (foundIndex === -1) {
      res.status(404).send("Product not found");
      return;
    }
    const updateProduct: Product = {
      ...products[foundIndex],
      product_name: req.body.product_name ?? products[foundIndex].product_name,
      product_description:
        req.body.product_description ??
        products[foundIndex].product_description,
      product_price:
        req.body.product_price ?? products[foundIndex].product_price,
    };

    products[foundIndex] = updateProduct;
    res.status(201).json(updateProduct);
  },
);

/**
 * Delete todo by id
 *
 * @route PUT /products/:id
 * @param { Request } - Express request object which contains id param and todo object.
 * @param { Response } - Express response object.
 * @returns { void } - Respond with confirm message.
 */
productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const foundIndex = products.findIndex((p) => p.id === id);
  if (foundIndex === -1) {
    res.status(404).send("Product not found");
    return;
  }
  products.splice(foundIndex, 1);
  res.status(200).send("Product deleted");
});

export default productRouter;
