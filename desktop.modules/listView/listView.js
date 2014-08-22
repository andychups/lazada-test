/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('listView', ['notify', 'list', 'templater', 'CompareList'], function (provide, notify, list, templater, CompareList) {
    var listView = {};

    listView._$context = $('.js-compare-list');
    listView._$domView = $('.js-compare-list-view');
    listView._view = React.renderComponent(CompareList(), listView._$domView[0]);
    listView._templateName = 'compare-list';
    listView._ajaxRequestProgress = false;

    listView._$context.on('click', '.js-list-view__grab', function (e) {
        var $el = $(this),
            $form = $el.closest('form');

        if (listView._ajaxRequestProgress) {
            return false;
        }

        listView._ajaxRequestProgress = true;
        notify.send('Loading...');

        $.ajax({
            'dataType': "json",
            'url': $form.attr('action'),
            'data': $form.serialize()
        })
        .done(function (productData) {
            listView.addProduct(productData.data);
            notify.send('Complete');
        })
        .fail(function (err) {
            notify.send(JSON.stringify(err));
        })
        .always(function () {
            listView._ajaxRequestProgress = false;
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
    };

    listView.getViewOrientedData = function () {
        var result = [],
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
        listView._view.setProps(this.getViewOrientedData());
        //listView._$domView.html(templater.render(this._templateName, this.getViewOrientedData()));
    };

    provide(listView);
});