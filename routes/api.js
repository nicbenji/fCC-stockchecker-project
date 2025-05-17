'use strict';

const controller = require("../controller/controller");

module.exports = function(app) {

    app.route('/api/stock-prices')
        .get(function(req, res) {

            const { stock, like: isLiked } = req.query;

            if (!stock) {
                return res.json({ error: 'Stock needs to be defined' });
            }
            if (isLiked && !(isLiked == 'true' || isLiked == 'false')) {
                return res.json({ error: 'Like needs to be a boolean' });
            }
            if (!isLiked) {
                isLiked = false;
            }
            if (!Array.isArray(stock)) {
                stock = [stock];
            }
            if (stock.length > 2) {
                return res.json({ error: 'Can only compare 2 stocks' });
            }
            for (const symbol of stock) {
                if (!/^[A-Za-z]{1, 5}$/.test(symbol)) {
                    return res.json({ error: 'Invalid stock: ' + symbol });
                }
            }

            try {
                const stockData = controller.getStockData(stock, isLiked);
                return res.json({ stockData });
            } catch (error) {
                console.error(error);
            }

        });

};
