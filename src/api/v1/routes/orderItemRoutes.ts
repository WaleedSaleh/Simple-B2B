import { Router } from 'express';
import {OrderItemController} from "../../../controllers/orderItemController";


const router = Router();
const orderItemController = new OrderItemController();

router.get('/list', orderItemController.getAllOrderItems.bind(orderItemController));
router.get('/:id', orderItemController.getOrderItemById.bind(orderItemController));
router.post('/create', orderItemController.createOrderItem.bind(orderItemController));
router.put('/update/:id', orderItemController.updateOrderItem.bind(orderItemController));
router.delete('/delete/:id', orderItemController.deleteOrderItem.bind(orderItemController));

export default router;
