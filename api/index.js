
require('dotenv').config();
const cors = require("cors");
const port = "8080";
const express = require("express");
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST endpoint to cancel an order
app.post('/cancelOrder', async (req, res) => {
    console.log('req', req.body);

    const {
        orderNumber,
        sapCustomerNumber,
        reasonCode
    } = req.body;

    try {
        // Sending the request to the external API using Axios
        const response = await axios.post(
            `${process.env.BASE_URL}//v1/order/cancel`,
            {
                orderNumber,
                sapCustomerNumber,
                reasonCode
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ocp-apim-subscription-key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
                }
            }
        );

        // Send the external API response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error cancelling order:', error.message);
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'Internal Server Error' };

        // Send the error response back to the client
        res.status(status).json(data);
    }
});

app.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
        const response = await axios.post(
            `${process.env.BASE_URL}/v1/customer/password/forgot`,
            { email },  // Sending email in the request body
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'ocp-apim-subscription-key': process.env.OCP_APIM_SUBSCRIPTION_KEY
                }
            }
        );

        // Send the response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error sending password reset request:', error.message);
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'Internal Server Error' };

        // Send error details to the client
        res.status(status).json(data);
    }
});

app.post('/refundOrder', async (req, res) => {
    const {
        orderNumber,
        lineItems,
        deliveryCompanyName,
        reasonCode,
    } = req.body;

    try {
        const response = await axios.post(
            `${process.env.BASE_URL}/v1/order/refund`,
            {
                orderNumber,
                lineItems,
                deliveryCompanyName,
                reasonCode
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        );

        // Send success response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error processing refund:', error.message);
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'Internal Server Error' };

        // Send error response back to the client
        res.status(status).json(data);
    }
});

app.get('/storeFulfillment', async (req, res) => {
    const { postalCode, distance } = req.query;

    try {
        const response = await axios.get(
            `${process.env.BASE_URL}/v1/store/fulfillment`,
            {
                params: { postalCode, distance },
                headers: {
                    'ocp-apim-subscription-key': process.env.OCP_APIM_SUBSCRIPTION_KEY
                }
            }
        );

        // Send the successful response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error fetching store fulfillment:', error.message);
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'Internal Server Error' };

        // Send the error response to the client
        res.status(status).json(data);
    }
});

app.post('/orderDetails', async (req, res) => {
    const {
        email,
        orderNumber
    } = req.body

    try {
        const response = await axios.post(
            `${process.env.BASE_URL}/v1/order/status`,
            { email, orderNumber },
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'ocp-apim-subscription-key': process.env.OCP_APIM_SUBSCRIPTION_KEY
                }
            }
        )
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.error('Error sending:', error.message);
        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : { message: 'Internal Server Error' };

        // Send error details to the client
        res.status(status).json(data);
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


module.exports = app;