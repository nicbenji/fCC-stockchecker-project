const { StockLikes } = require("../model/like");

async function getStockData(symbols, isLiked, ipAddrHash) {
    const stock1 = await callStockApi(symbols[0]);
    const stock1Likes = await getStockLikes(stock1.stock, isLiked, ipAddrHash);

    if (symbols.length === 1) {
        stock1.likes = stock1Likes;
        return stock1;
    }

    const stock2 = await callStockApi(symbols[1]);
    const stock2Likes = await getStockLikes(stock2.stock, isLiked, ipAddrHash);

    const relLikes = stock1Likes - stock2Likes;
    const stockData = [
        { ...stock1, rel_likes: relLikes },
        { ...stock2, rel_likes: -relLikes }
    ];

    return stockData;
}

async function getStockLikes(stockSymbol, isLiked, ipAddrHash) {
    if (isLiked) {
        await StockLikes.updateOne(
            { stockSymbol },
            { $addToSet: { likerIpAddrHashes: ipAddrHash } },
            { upsert: true }
        );
    } else {
        await StockLikes.updateOne(
            { stockSymbol },
            { upsert: true }
        );
    }

    const doc = await StockLikes.findOne({ stockSymbol })
        .select('likerIpAddrHashes')
        .lean();

    return doc ? doc.likerIpAddrHashes.length : 0;
}

async function callStockApi(symbol) {
    const response = await fetch(
        `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`
    );
    if (!response.ok) {
        throw new Error(`Error calling stock API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return { stock: data.symbol, price: data.latestPrice };
}

exports.getStockData = getStockData;
