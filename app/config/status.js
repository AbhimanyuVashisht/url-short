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
                error: true,
                message: 'Required Input Missing'
            };
            break;

        case 'url_missing':
            status = {
                code: code,
                error: true,
                message: 'Missing Url'
            };
            break;

        case 'shorten_url_already_present':
            status = {
                code: code,
                error: false,
                message: 'Shorten Url Already Present'
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
