import axios from 'axios';
import mainConfig from "../config/mainConfig";


async function sendOrderToThirdPartyApi(orderDetails: Partial<any>) {
    try {
        if (mainConfig.thirdParty) {
            const response = await axios.post(mainConfig.thirdParty,
                orderDetails,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${mainConfig.authorization}`
                    }
                });
            console.log('Order data successfully sent to third-party API:', response.data);
            return response.data;
        }
        console.log("Success, but No url provided!")
    } catch (error) {
        console.error('Failed to send order data to third-party API:', error);
        throw error;
    }
}

export default sendOrderToThirdPartyApi;
