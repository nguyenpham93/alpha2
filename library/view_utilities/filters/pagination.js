/** Created by nguyenpham 10/6/2017 */

module.exports = {
    handler: function (totalPage, currentPage, link) {
        if (link == null || link == 'undefined')
        link = '';
        let result = 
            '<article id="home-pagination">' +
                '<ul class="pager">' +
                    '<li style="list-style: none">';

                        for ( let i = 1; i <= totalPage ; i++) {
                            result += '<span><a href="' + link + '/page/' + i + '" >' + i + '</a></span>';
                        }
                        
                    result += '</li>' +
                '</ul>' +
            '</article>';
        return result;
    }
};