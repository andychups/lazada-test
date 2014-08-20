/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('list', function (provide) {
    var list = {};

    list._data = {};
    list._dataID = [];
    list._generalSpecification = {'dict': {}, 'list': []};

    list._extractGeneralSpecification = function () {
        var listId = this._dataID,
            data = this._data,
            spec = this._generalSpecification = {'dict': {}, 'list': []};

        for (var a = 0, al = listId.length; a < al; a++) {
            var productData = data[listId[a]];

            for (var b = 0, bl = productData.length; b < bl; b++) {
                if (!spec.dict.hasOwnProperty(productData[b].id)) {
                    spec.dict[productData[b].id] = productData[b];
                    spec.list.push(productData[b]);
                }
            }
        }
    };


    list.getGeneralSpecificationData = function () {
        return this._generalSpecification;
    };


    list.getProductsData = function () {
        return this._data;
    };


    list.getProductsId = function () {
        return this._dataID;
    };


    list.addProductData = function (productData) {
        if (this.hasProduct(productData.productId)) {
            return false;
        }

        list._data[productData.productId] = productData.data;
        list._dataID.push(productData.productId);
        list._extractGeneralSpecification();

        return true;
    };


    list.getProductDataById = function (productId) {
        if (!this.hasProduct(productId)) {
            return false;
        }

        return this._data[productId];
    };


    list.removeProductDataByID = function (productId) {
        if (!this.hasProduct(productId)) {
            return false;
        }

        delete this._data[productId];

        for (var i = 0, l = this._dataID.length; i < l; i++) {
            if (this._dataID[i] == productId) {
                this._dataID.splice(i, 1);
            }
        }

        list._extractGeneralSpecification();

        return true;
    };

    list.hasProduct = function (id) {
        return this._data.hasOwnProperty(id);
    };

    provide(list);
});