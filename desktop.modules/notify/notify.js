/**
 * @file
 * @date 20.08.14
 * @author andychups <andychups@yandex-team.ru>
 */

modules.define('notify', function (provide) {
    var notify = {};

    notify._placeholder = $('.js-notify');

    notify.send = function (message) {
        notify._placeholder.text(message);
    };

    provide(notify);
});