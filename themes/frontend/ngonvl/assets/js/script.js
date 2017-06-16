
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
                                        '<div class="social-info">' +
                                            '<span class="viewcount">' +
                                                '<i class="fa fa-eye" aria-hidden="true"></i>' +
                                                ' lượt xem' +
                                            '</span>' +

                                            '<span class="comment-count">' +
                                                '<i class="fa fa-comments" aria-hidden="true"></i>' +
                                                '<span class="fb-comments-count" data-href="http://localhost:8000/blog/posts/' +  post.id + '/' +  post.alias + '"></span>' +
                                                ' bình luận' +
                                            '</span>' +
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
