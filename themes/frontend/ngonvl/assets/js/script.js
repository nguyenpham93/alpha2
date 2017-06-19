
function renderPost (posts) {
	let article = '';
	posts.forEach( (post) => {
                        article += 
                            '<article>' + 
                                '<div class="blog-item-wrap">' + 
                                    '<header class="entry-header">' + 
                                        '<div class="post-format">' +
                                            '<span>' +
                                                '<i class="fa fa-camera"></i>' +
                                            '</span>' +
                                        '</div>' +
                                        '<p class="title-content">' +
                                            '<a href="/blog/posts/' + post.id + '/' + post.alias + '">' + post.title + '</a>' +
                                        '</p>' +
                                        '<span class="ownby">Đăng bởi <a href = "/blog/posts/author/' + post.created_by + '"><span class="onwername">' + post.user.display_name + '</span></a></span>' + 

                                        '<div class="social-info">' +
                                            '<span class="viewcount">' +
                                                '<i class="fa fa-eye" aria-hidden="true"></i>' +
                                                post.view_count + ' lượt xem' +
                                            '</span>' +

                                            '<span class="comment-count">' +
                                                '<i class="fa fa-comments" aria-hidden="true"></i>' +
                                                '<span class="fb-comments-count" data-href="http://thichmongdep.com/blog/posts/' +  post.id + '/' +  post.alias + '"></span>' +
                                                '<a href="/blog/posts/' + post.id + '/' + post.alias + '"> bình luận ' +
                                            '</span>' +

                                            '<div class="fb-like" data-href="http://thichmongdep.com/blog/posts/' + post.id + '/' + post.alias + '" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>' +
                                        '</div>' + 
                                    '</header>' + 

                                    '<div class="content-main">' + 
                                        '<a href=" /blog/posts/' +  post.id + '/' + post.alias + '">' + 
                                            '<img class="img-responsive" src="' + post.image + '" alt="">' + 
                                        '</a>' + 
                                    '</div>' + 
                                '</div>' + 
                                '</article>' ;
                    });
					return article;
}
