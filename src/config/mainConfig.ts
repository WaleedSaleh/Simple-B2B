import "dotenv/config";
import * as process from "node:process";

export default {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.APP_PORT || '3000'),
    thirdParty: process.env.THIRD_PARTY_API_URL,
    authorization:process.env.AUTH_TOKEN,
};
