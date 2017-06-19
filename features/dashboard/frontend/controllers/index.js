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
                user        : req.session.user,
                baseURL     : ''
            })

        });
    };

    controller.hot = function (req, res) {

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

            order  : "view_count desc"

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
                user        : req.session.user,
                baseURL     : '/hot'
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
        controller.checkAuth(req,res);
        let user = req.user;
        let uploadPath = application.arrFolder + 'upload/fileman/uploads/users/' + user.id + '/';
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
            if (!fields.is_owner){
                fields.is_owner = '0';
            }
            application.feature.blog.actions.create ({
                title      : fields.image_title,
                categories : ':1:',
                intro_text : fields.description || '',
                full_text  : '<p><img alt="" src="/fileman/uploads/users/' + user.id +'/' + fileName + '"/></p>',
                image      :  '/fileman/uploads/users/' + user.id +'/' + fileName,
                published  : 0,
                created_by : user.id,
                author_visible : true,
                is_owner   : fields.is_owner || '0',
                source_img : fields.source_img || ''
            },'post').then( function(post) {
                res.json({success : "Đăng ảnh thành công, vui lòng đợi xét duyệt! ^^"});
            }).catch (function(){
                application.utils.fs.remove(fullPath)
                res.json({error : 'Đã có lỗi khi upload ảnh của bạn, vui lòng chọn một tiêu đề khác!'});
            });
        });

        form.on('fileBegin', function (name, file) {
            // update name file
            let fileType = file['type'].split('/')[1];
            let d = new Date();
            fileName = shortid.generate() + '_' + d.getTime() + '.' + fileType; 
            file.path = uploadPath + fileName;
            fullPath = file.path; 
        });

    };


    controller.checkAuth = function (req, res) {
        let user = {};

        if (req.isAuthenticated()) {
            user.id = req.user.id;
            user.user_image_facebook_url = req.user.user_image_facebook_url;
            user.display_name = req.user.display_name;
            user.email = req.user.user_email;

            req.session.login = true;
            req.session.user = user;
        } else {
            req.session.login = false;
            req.session.user = user;
        }
    }

    controller.not_login = function (req, res) {
        res.frontend.render('not_login');
    };

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

    controller.hot_page = function (req, res) {
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

            order  : "view_count desc"

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

    controller.profile = function (req, res){
        controller.checkAuth(req,res);
        res.frontend.render('profile', {
            title       : 'Profile Detail',
            login       : req.session.login,  
            user        : req.session.user
        });
    }

};