/**
 * @file
 * @date 19.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

const PARSE_HOST = 'lazada.vn';

var api = {};
var Vow = require('vow');
var url = require('url');
var http = require('http');
var md5 = require('md5');
var $ = require('cheerio');

api.get = function (paramUrl) {
    var promise = Vow.promise();
    var parsedUrl = url.parse(paramUrl);

    if (!isValidUrl(parsedUrl)) {
        promise.reject({ 'status': 'NOT_VALID_URL', 'code': 500, 'message': 'Product must be in "'+PARSE_HOST+'" area' });
    }

    // turn aside mobile version
    parsedUrl.headers = {};
    parsedUrl.headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 YaBrowser/14.5.1847.18823 Safari/537.36';

    http
        .get(parsedUrl, function (res) {
            var data = '';

            res
                .on('data', function (chunk) {
                    data += chunk;
                })
                .on('end', function () {
                   parseContent(data).then(
                        function (parsedData) {
                            promise.fulfill(parsedData);
                        },

                        function (err) {
                            promise.reject({ 'status': 'PARSE_DATA_ERROR', 'code': 500, 'message': err });
                        }
                    );
                });
        })
        .on('error', function (err) {
            promise.reject({ 'status': 'HTTP_REQUEST_ERROR', 'code': 500, 'message': err });
        });

    return promise;
};

function parseContent(notParsedData) {
    var promise = Vow.promise();
    var result = [];
    var SKU = null;

    try {
        $(notParsedData).find('#productSpecifications .prd-attributes tr').each(function (i, elem) {
            var $line = $(this).find('th, td'),
                title = $line.eq(0).text().trim(),
                desc = $line.eq(1).text().trim();

            if (title == 'SKU') {
                SKU = desc.replace(/\s/gi, '').toLowerCase();
            }

            result.push({
                'id': md5.digest_s(title.replace(/\s/gi, '').toLowerCase()),
                'title': title,
                'desc': desc
            });
        });

        promise.fulfill({'productId': SKU, 'data': result});
    } catch (err) {
        promise.reject(err);
    }

    return promise;
}

function isValidUrl(parsedUrl) {
    return parsedUrl.host.lastIndexOf(PARSE_HOST);
}

module.exports = api;