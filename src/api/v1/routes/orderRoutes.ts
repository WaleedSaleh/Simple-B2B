import {Request, Response, Router} from 'express';
import {OrderController} from "../../../controllers/orderController";

const router = Router();
const orderController = new OrderController();


router.get('/filter', async (req: Request, res: Response) => {await orderController.getFilteredOrders(req,res)});
router.get('/list', orderController.getAllOrders.bind(orderController));
router.get('/:id', orderController.getOrderById.bind(orderController));
router.post('/create', orderController.createOrder.bind(orderController));
router.put('/update/:id', orderController.updateOrder.bind(orderController));
router.delete('/delete/:id', orderController.deleteOrder.bind(orderController));

export default router;
