/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('notify', function (provide) {
    var notify = {};

    notify.send = function (message) {
        alert(message);
    };

    provide(notify);
});