modules.define('CompareList', ['CompareListSpecName', 'CompareListCell'], function (provide, CompareListSpecName, CompareListCell) {
    var dom = React.DOM;
    var CompareList = React.createClass({
        
        render: function () {
            var data = this.props.data;
            if (this.props.spec) {
                var tr = this.props.spec.list.map(function (spec) {
                    if (data) {
                        var products = data.map(function (product) {
                            var productDescOfCol = product[spec.id] && product[spec.id].desc
                            return (
                                CompareListCell({spec: spec, product: product})
                            )
                        });
                    }
                    return (
                        dom.tr(
                            {
                                className: 'compare-list__line'
                            },
                            CompareListSpecName({spec: spec}),
                            products
                        )
                    )
                });
            }
            
            return (
                dom.table({
                    className: 'compare-list__table'
                },
                tr)
            )
        }
    })

    provide(CompareList);
});

modules.define('CompareListCell', function (provide) {
    var dom = React.DOM;
    var CompareListCell = React.createClass({
        render: function () {
            var productDescOfCol = this.props.product[this.props.spec.id] && this.props.product[this.props.spec.id].desc
            return (
                dom.td(
                    {
                        className: 'compare-list__cell'
                    },
                    dom.span({}, productDescOfCol ? productDescOfCol : '\u2014')
                )
            )
        }
    })

    provide(CompareListCell);
});

modules.define('CompareListSpecName', function (provide) {
    var dom = React.DOM;
    var CompareListSpecName = React.createClass({
        render: function () {
            return (
                dom.td(
                    {
                        className: 'compare-list__cell compare-list__cell_position_first',
                        'data-id': this.props.spec.id
                    },
                    this.props.spec.title
                )
            )
        }
    })

    provide(CompareListSpecName);
});