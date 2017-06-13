const Router = require('express').Router;
const router = new Router();


router.get('/', function(req, res, next) {
    res.status(200).render('index');
});


module.exports = router;
