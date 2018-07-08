var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    res.render('article/articleList', { tagId: req.params.id });
});


router.get('/info/:id', function(req, res, next) {
    res.render('article/articleInfo', { articleId: req.params.id });
});


module.exports = router;
