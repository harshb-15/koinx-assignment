const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../models/Crypto');

// Function to schedule fetching of crypto data every 2 hours
const fetchCryptoData = () => {
    cron.schedule('0 */2 * * *', async () => {
        try {
            // Fetch data from CoinGecko for Bitcoin, Matic, and Ethereum
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
            );
            const { bitcoin, 'matic-network': matic, ethereum } = response.data;

            // Prepare the data to be inserted into the database
            const cryptoData = [
                {
                    name: 'Bitcoin',
                    price: bitcoin.usd,
                    marketCap: bitcoin.usd_market_cap,
                    change: bitcoin.usd_24h_change,
                },
                {
                    name: 'Matic-network',
                    price: matic.usd,
                    marketCap: matic.usd_market_cap,
                    change: matic.usd_24h_change,
                },
                {
                    name: 'Ethereum',
                    price: ethereum.usd,
                    marketCap: ethereum.usd_market_cap,
                    change: ethereum.usd_24h_change,
                },
            ];

            // Insert data into the Crypto collection
            await Crypto.insertMany(cryptoData);
            console.log('Crypto data fetched and stored successfully.');
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    });
};

module.exports = fetchCryptoData;
