const Crypto = require('../models/Crypto');

const getStats = async (req, res) => {
    const { coin } = req.query;

    try
    {
        const cryptoData = await Crypto.findOne({
            name: coin.charAt(0).toUpperCase() + coin.slice(1),
        }).sort({ createdAt: -1 });

        if (!cryptoData)
            return res.status(404).send({ message: 'Coin not found' });

        res.send({
            price: cryptoData.price,
            marketCap: cryptoData.marketCap,
            '24hChange': cryptoData.change,
        });
    } catch (error)
    {
        res.status(500).send({ message: 'Error fetching stats' });
    }
};



module.exports = { getStats };
