'use strict';

module.exports = function (component) {
    let controller = component.controllers.frontend;

    return {
        "/": {
            get: {
                handler: controller.index
            }
        },
        "/upload": {
            get: {
                handler: controller.upload_page
            }
        },
        "/upload/image": {
            post: {
                handler: controller.upload_image
            }
        },
        "/page/:page": {
            get: {
                handler: controller.index2
            }
        },
        "/login/facebook": {
            get: {
                authenticate: 'facebook_login'
            }
        },
        "/login/facebook/callback": {
            get: {
                authenticate: 'facebook_login'
            }
        },
        "/logout": {
            get: {
                handler: controller.logout
            }
        }
    }
};