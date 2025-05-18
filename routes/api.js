'use strict';

const controller = require("../controller/controller");

module.exports = function(app) {

    app.route('/api/stock-prices')
        .get(function(req, res) {

            let { stock, like: isLiked } = req.query;
            const ipAddr = req.connection.remoteAddress;

            if (!isLiked || isLiked === 'false') {
                isLiked = false;
            } else if (isLiked === 'true') {
                isLiked = true;
            } else {
                return res.status(400).json({ error: 'Like needs to be a boolean' });
            }

            if (!stock || stock.length === 0) {
                return res.status(400).json({ error: 'Stock needs to be defined' });
            }
            if (!Array.isArray(stock)) {
                stock = [stock];
            }
            if (stock.length > 2) {
                return res.status(400).json({ error: 'Can only compare 2 stocks' });
            }
            for (const symbol of stock) {
                if (!/^[A-Za-z]{1,5}$/.test(symbol)) {
                    return res.status(400).json({ error: 'Invalid stock: ' + symbol });
                }
            }

            try {
                const stockData = controller.getStockData(stock, isLiked, ipAddr);
                return res.json({ stockData });
            } catch (error) {
                console.error(error);
            }

        });

};
