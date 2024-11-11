import 'reflect-metadata';
import { AppDataSource } from './data-source';
import {seedCustomer} from "./seeders/customerSeeder";
import {seedProduct} from "./seeders/productSeeder";
import {seedCategory} from "./seeders/categorySeeder";
import {seedOrders} from "./seeders/orderSeeder";

async function runSeeders() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected. Running seeders...');
        await seedCategory(AppDataSource);
        await seedCustomer(AppDataSource);
        await seedProduct(AppDataSource);
        await seedOrders(AppDataSource);
        console.log('All seeders ran successfully.');
    } catch (error) {
        console.error('Error running seeders:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

runSeeders();
