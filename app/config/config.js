'use strict';

const mongoose = require('mongoose');

const mongodbConnectionURI = 'mongodb+srv://admin:LRAdQnyyegHdgFL0@cluster0-uvznz.mongodb.net/test?retryWrites=true&w=majority';

(async () => {
    try {
        await mongoose.connect(mongodbConnectionURI, {useNewUrlParser: true});
        console.log('Connected to Database...');
    } catch (e) {
        console.log(e);
    }
})();


