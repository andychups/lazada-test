var apiController = {};
var apiProduct = require('../../modules/api.product');

apiController.getProduct = function (req, res) {
    apiProduct
        .get(req.query.url)
        .then(
            function (data) {
                res.send({'status': 'SUCCESS', 'data': data});
            },

            function (err) {
                res.send(500, {'status': 'FAILED', 'message': err});
            }
        );
};

module.exports = apiController;