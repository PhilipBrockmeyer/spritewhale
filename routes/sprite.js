/*
* POST sprite.
*/

exports.spritePost = function (req, res) {
    console.log('save requested');
    res.send({ result: 'success', id: 1 });
};