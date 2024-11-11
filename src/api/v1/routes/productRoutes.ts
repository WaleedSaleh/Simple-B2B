// src/routes/ProductRoutes.ts
import { Router, Request, Response } from 'express';
import {ProductController} from "../../../controllers/productController";
import {upload} from "../../../middleware/uploadMiddleware";


const router = Router();
const productController = new ProductController();


router.get('/list', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.post('/create/', productController.createProduct.bind(productController));
router.put('/update/:id', productController.updateProduct.bind(productController));
router.delete('/delete/:id', productController.deleteProduct.bind(productController));


// Product Images End Points
router.post('/add/:id/images', upload.array('images'), productController.addProductImages.bind(productController)); // For uploading images
router.get('/:id/images', productController.getProductImages.bind(productController)); // For retrieving product images
router.delete('/delete/:id/images/:imageId', productController.deleteProductImage.bind(productController)); // For deleting a specific image


export default router;
