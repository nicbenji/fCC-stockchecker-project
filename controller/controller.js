function getStockData(symbols, isLiked, ipAddr) {
    const stock1 = callStockApi(symbols[0]);
    const stock1Likes = getStockLikes(stock1, isLiked, ipAddr);

    if (symbols.length === 1) {
        stock1.likes = stock1Likes;
        return stock1;
    }

    const stock2 = callStockApi(symbols[1]);
    const stock2Likes = getStockLikes(stock2, isLiked, ipAddr);

    const relLikes = stock1Likes - stock2Likes;
    const stockData = [
        { ...stock1, rel_likes: relLikes },
        { ...stock2, rel_likes: -relLikes }
    ];

    return stockData;
}

function getStockLikes(stock, isLiked, ipAddr) {
    if (isLiked) {
    }
}

function callStockApi(symbols) {
}

exports.getStockData = getStockData;
