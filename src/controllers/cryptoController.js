const Crypto = require('../models/Crypto');

// Controller for the /stats API
const getStats = async (req, res) => {
    const { coin } = req.query;

    try {
        // Fetch the most recent record for the specified coin
        const cryptoData = await Crypto.findOne({
            name: coin.charAt(0).toUpperCase() + coin.slice(1),
        }).sort({ createdAt: -1 });

        if (!cryptoData)
            return res.status(404).send({ message: 'Coin not found' });

        // Return the latest price, market cap, and 24-hour change
        res.send({
            price: cryptoData.price,
            marketCap: cryptoData.marketCap,
            '24hChange': cryptoData.change,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching stats' });
    }
};

// Controller for the /deviation API
const getDeviation = async (req, res) => {
    const { coin } = req.query;

    try {
        // Fetch the last 100 records for the specified coin
        const records = await Crypto.find({
            name: coin.charAt(0).toUpperCase() + coin.slice(1),
        })
            .sort({ createdAt: -1 })
            .limit(100);

        if (records.length === 0)
            return res.status(404).send({ message: 'No records found' });

        // Calculate standard deviation of prices
        const prices = records.map((record) => record.price);
        const mean =
            prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance =
            prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
            prices.length;
        const deviation = Math.sqrt(variance);

        res.send({ deviation });
    } catch (error) {
        res.status(500).send({ message: 'Error calculating deviation' });
    }
};

module.exports = { getStats, getDeviation };
