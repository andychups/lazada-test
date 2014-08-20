/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('templater', function (provide) {
    var templater = {};

    templater._list = window.jadeTemplates;

    templater.render = function (name, data) {
        if (!this._list.hasOwnProperty(name)) {
            return null;
        }

        return this._list[name](data);
    };

    provide(templater);
});