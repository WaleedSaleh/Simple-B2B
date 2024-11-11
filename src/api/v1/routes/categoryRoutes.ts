import { Router } from 'express';
import {CategoryController} from "../../../controllers/categoryController";

const router = Router();
const categoryController = new CategoryController();

router.get('/list', categoryController.listAllCategories.bind(categoryController));
router.get('/:id', categoryController.getCategory.bind(categoryController));
router.post('/create', categoryController.createCategory.bind(categoryController));
router.put('/update/:id', categoryController.updateCategory.bind(categoryController));
router.delete('/delete/:id', categoryController.deleteCategory.bind(categoryController));

export default router;
