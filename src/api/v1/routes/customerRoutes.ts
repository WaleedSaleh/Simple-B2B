import { Router } from 'express';
import {CustomerController} from "../../../controllers/customerController";

const router = Router();
const customerController = new CustomerController();

router.get('/list', customerController.getAllCustomers.bind(customerController));
router.get('/:id', customerController.getCustomerById.bind(customerController));
router.post('/create', customerController.createCustomer.bind(customerController));
router.put('/update/:id', customerController.updateCustomer.bind(customerController));
router.delete('/delete/:id', customerController.deleteCustomer.bind(customerController));

export default router;
