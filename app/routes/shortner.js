'use strict';

let express = require('express'),
    router = express.Router();

let controller  = require('../controller/shortner');

router.post('/', controller.createShortenedUrl);
router.get('/:shorten', controller.getOriginalUrl);
router.get('/status', controller.getShortenURLStatus);

module.exports = router;
