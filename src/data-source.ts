import dbConfig from "./config/dbConfig";
import mainConfig  from "./config/mainConfig";
import { DataSource } from "typeorm";
import {Category} from "./entities/category/Category";
import {Order} from "./entities/order/Order";
import {OrderItem} from "./entities/orderItem/OrderItem";
import {Product} from "./entities/product/Product";
import {Sales} from "./entities/sales/Sales";
import {Customer} from "./entities/customer/Customer";
import {ProductImage} from "./entities/productImage/ProductImage";
import {OrderSubscriber} from "./subscribers/orderSubscriber";

console.log("mainConfig :: ", mainConfig);

console.log("dbConfig :: ", dbConfig);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: false,
    entities: [ProductImage,Customer,Category, Order, OrderItem, Product, Sales],
    migrations: [`${__dirname}/../**/*.entity.{ts,js}`],
    subscribers:[OrderSubscriber]
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => {
        console.error("Error during Data Source initialization :: ", error);
    });
