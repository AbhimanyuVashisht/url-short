'use strict';

let getStatus = function (code) {
    let status;

    switch (code) {
        case 'success':
            status = {
                code: code,
                error: false,
                message: 'Successful'
            };
            break;

        case 'input_missing':
            status = {
                code: code,
                error: false,
                message: 'Required Input Missing'
            };
            break;

        case 'url_missing':
            status = {
                code: code,
                error: false,
                message: 'Missing Url'
            };
            break;


        default:
            status = {
                code: 'generic_fail',
                error: true,
                message: 'Generic failure: Something went wrong'
            };
            break;
    }

    return status;
};

module.exports = {
    getStatus: getStatus
};
