'use strict';

let express = require('express'),
    router = express.Router();

let controller  = require('../controller/shortner');

router.post('/', controller.createShortenedUrl);
router.get('/:shorten', controller.getOriginalUrl);

module.exports = router;
