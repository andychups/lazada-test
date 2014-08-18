/**
 * @file
 * @date 17.02.14
 * @author andychups <andychups@yandex-team.ru>
 */

var post = {};

post.result = function (req, res) {
    res.render('post/post');
};

module.exports = post;