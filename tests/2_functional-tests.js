const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('should return one stock', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=NFLX')
            .end((err, res) => {
                const stockData = res.body.stockData;
                assert.equal(res.status, 200);
                assert.equal(stockData.stock, 'NFLX');
                assert.isNumber(stockData.price);
                assert.isAtLeast(stockData.price, 0);
                assert.isNumber(stockData.likes);
                assert.isAtLeast(stockData.likes, 0);
                done();
            });
    });

    test('should return one stock and like it', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=NFLX&like=true')
            .end((err, res) => {
                const stockData = res.body.stockData;
                assert.equal(res.status, 200);
                assert.equal(stockData.stock, 'NFLX');
                assert.isNumber(stockData.price);
                assert.isAtLeast(stockData.price, 0);
                assert.isNumber(stockData.likes);
                assert.isAtLeast(stockData.likes, 0);
                done();
            });
    });

    test('should return one stock and try to like it again', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=NFLX&like=true')
            .end((err, res) => {
                const stockData = res.body.stockData;
                assert.equal(res.status, 200);
                assert.equal(stockData.stock, 'NFLX');
                assert.isNumber(stockData.price);
                assert.isAtLeast(stockData.price, 0);
                assert.isNumber(stockData.likes);
                assert.isAtLeast(stockData.likes, 0);
                done();
            });
    });

    test('should return two stocks', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=NFLX&stock=GOOG')
            .end((err, res) => {
                const stockData = res.body.stockData;
                assert.equal(res.status, 200);
                assert.equal(stockData[0].stock, 'NFLX');
                assert.equal(stockData[1].stock, 'GOOG');
                assert.isNumber(stockData[0].price);
                assert.isAtLeast(stockData[0].price, 0);
                assert.isNumber(stockData[1].price);
                assert.isAtLeast(stockData[1].price, 0);
                assert.isNumber(stockData[0].rel_likes);
                assert.isAtLeast(stockData[0].rel_likes, 0);
                assert.isNumber(stockData[1].rel_likes);
                assert.isAtLeast(stockData[1].rel_likes, 0);
                done();
            });
    });

    test('should return two stocks and like them', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=NFLX&stock=GOOG&like=true')
            .end((err, res) => {
                const stockData = res.body.stockData;
                assert.equal(res.status, 200);
                assert.equal(stockData[0].stock, 'NFLX');
                assert.equal(stockData[1].stock, 'GOOG');
                assert.isNumber(stockData[0].price);
                assert.isAtLeast(stockData[0].price, 0);
                assert.isNumber(stockData[1].price);
                assert.isAtLeast(stockData[1].price, 0);
                assert.isNumber(stockData[0].rel_likes);
                assert.isAtLeast(stockData[0].rel_likes, 0);
                assert.isNumber(stockData[1].rel_likes);
                assert.isAtLeast(stockData[1].rel_likes, 0);
                done();
            });
    });

});
