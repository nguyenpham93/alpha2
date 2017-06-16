'use strict';
let moment = require('moment');
let formidable = require('formidable');
let shortid = require('shortid');
module.exports = function (controller, component, application) {

    controller.index = function (req, res) {

        let page = req.params.page || 1;
        let itemOfPage = application.getConfig("pagination").frontNumberItem || 5;
        let totalPage = 1;

        application.feature.blog.actions.findAndCountAll({
            where : {
                published : 1,
                type : 'post'
            },

            include : [{
                model : application.models.user
            }],

            limit  : itemOfPage,

            offset : (page - 1) * itemOfPage,

            order  : "id desc"

        })
        .then ((results) => {
            
            // Check Auth
            controller.checkAuth (req,res);        
            
            totalPage = Math.ceil( results.count/itemOfPage );

            res.frontend.render('index', {
                title       : 'ngonvl.com',
                posts       : results.rows,
                totalPage   : totalPage,
                itemOfPage  : itemOfPage,
                currentPage : page,
                login       : req.session.login,  
                user        : req.session.user
            })

        });
    };

    controller.upload_page = function (req, res) {
            res.frontend.render('upload', {
                title       : 'ngonvl.com',
                login       : req.session.login,  
                user        : req.session.user
            })
    };

    // Dang lam do
    controller.upload_image = function (req, res) {
        let uploadPath = application.arrFolder + 'upload/fileman/uploads/users/' + '3' + '/';
        let fileName = '';
        let status = '';
        let fullPath = ''

        // Create directory by user id
        application.utils.fs.mkdirs(uploadPath, function(err){
            if (err) res.json('error');
        });

        let form = new formidable.IncomingForm();
        form.uploadDir = uploadPath;
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
            let user = req.user;
            application.feature.blog.actions.create ({
                title      : "please post me up 22",
                categories : ':1:',
                intro_text : 'hellongonvl intro text',
                full_text  : '<p><img alt="" src="/fileman/uploads/users/3/' + fileName + '"/></p>',
                image      :  '/fileman/uploads/users/3/' + fileName,
                published  : 0,
                created_by : '3',
                author_visible : true
            },'post').then( function(post) {
                res.end('Your post was uploaded! Please take time for admin checking');
            }).catch (function(){
                application.utils.fs.remove(fullPath)
                res.end('error');
            });
        });

        form.on('fileBegin', function (name, file) {
            // update name file
            let fileType = file['type'].split('/')[1];

            // CHeck type of image
            if (fileType === 'png' || fileType === 'jpeg' || fileType === 'gif' || fileType === 'jpeg') {
                let d = new Date();
                fileName = shortid.generate() + '_' + d.getTime() + '.' + fileType; 
                file.path = uploadPath + fileName;
                fullPath = file.path; 
            } else {
                res.end('Error');
            }
        });

    };


    controller.checkAuth = function (req, res) {
        let user = {};

        if (req.isAuthenticated()) {
            console.log('dalogin');
            user.id = req.user.id;
            user.user_image_facebook_url = req.user.user_image_facebook_url;
            user.display_name = req.user.display_name;
            
            req.session.login = true;
            req.session.user = user;
        } else {
            console.log('chua login');
            req.session.login = false;
            req.session.user = user;
        }
    }

    controller.logout = function (req, res) {
        req.session.login = false;
        req.session.user = {};
        req.logout();
        res.redirect('/');
    };

    controller.index2 = function (req, res) {

        let page = req.params.page || 1;
        let itemOfPage = application.getConfig("pagination").frontNumberItem || 5;
        let totalPage = 1;

        application.feature.blog.actions.findAndCountAll({
            where : {
                published : 1,
                type : 'post'
            },

            include : [{
                model : application.models.user
            }],

            limit  : itemOfPage,

            offset : (page - 1) * itemOfPage,

            order  : "id desc"

        })
        .then ((results) => {
            totalPage = Math.ceil( results.count/itemOfPage );

            res.json({
                posts       : results['rows'],
                totalPage   : totalPage,
                itemOfPage  : itemOfPage,
                currentPage : page
            });

        });
    };
};