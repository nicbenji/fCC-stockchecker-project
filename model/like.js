const mongoose = require("mongoose");

const stockLikesSchema = new mongoose.Schema({
    stockSymbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    likerIpAddrHashes: {
        type: [String],
        default: []
    }
});

const StockLikes = mongoose.Model('stockLikes', stockLikesSchema);

exports.StockLikes = StockLikes;
