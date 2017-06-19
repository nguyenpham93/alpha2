'use strict';

module.exports = function (component) {
    let controller = component.controllers.frontend;

    return {
        "/": {
            get: {
                handler: controller.index
            }
        },
        "/hot": {
            get: {
                handler: controller.hot
            }
        },
        "/upload": {
            get: {
                handler: controller.upload_page,
                authenticate: true
            }
        },
        "/upload/image": {
            post: {
                handler: controller.upload_image,
                authenticate: true
            }
        },
        "/notlogin": {
            get: {
                handler: controller.not_login
            }
        },
        "/page-:page": {
            get: {
                handler: controller.index2
            }
        },
        "/hot/page-:page": {
            get: {
                handler: controller.hot_page
            }
        },
        "/login/facebook": {
            get: {
                authenticate: 'facebook_login',
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
        },
        "/profile": {
            get: {
                handler: controller.profile
            }
        },
    }
};