/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('listView', ['notify', 'list', 'templater'], function (provide, notify, list, templater) {
    var listView = {};

    listView._$context = $('.js-compare-list');
    listView._$domView = $('.js-compare-list-view');
    listView._templateName = 'compare-list';

    listView._$context.on('click', '.js-list-view__grab', function (e) {
        var $el = $(this),
            $form = $el.closest('form');

        $('.js-proto').html('Loading...');

        $.ajax({
            'dataType': "json",
            'url': $form.attr('action'),
            'data': $form.serialize()
        })
        .done(function (productData) {
            listView.addProduct(productData.data);
        })
        .fail(function (err) {
            console.log(err);
        });

        e.preventDefault();
    });

    listView.addProduct = function (data) {
        if (!list.hasProduct(data.productId)) {
            list.addProductData(data);
            listView.updateView();
        } else {
            notify.send('Product already in list');
        }

        $('.js-proto').html(JSON.stringify(data));
    };

    listView.getViewOrientedData = function () {
        var temp = null,
            result = [],
            spec = list.getGeneralSpecificationData(),
            productsData = list.getProductsData(),
            listId = list.getProductsId();

        for (var a = 0, al = listId.length; a < al; a++) {
            var productItem = productsData[listId[a]];
            var tempProductItem = {};

            for (var b = 0, bl = productItem.length; b < bl; b++) {
                tempProductItem[productItem[b].id] = productItem[b];
            }

            result.push(tempProductItem);
        }

        return {
            'spec': spec,
            'data': result
        }
    };

    listView.updateView = function () {
        console.log(this.getViewOrientedData());
        listView._$domView.html(templater.render(this._templateName, this.getViewOrientedData()));
    };

    provide(listView);
});