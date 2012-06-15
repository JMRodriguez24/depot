jQuery(function ($) {
    $('a[data-confirm], input[data-confirm], a.btn[data-method]').live('click', function (e) {
        var that = this;
        var createFormAndSubmit = function () {
            var link = $(that),
            href = link.attr('href'),
            method = link.attr('data-method'),
            form = $('<form method="post" action="' + href + '">'),
            metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

            form.hide()
                .append(metadata_input)
                .appendTo('body');

            form.submit(); 
        };
        
        var getAcceptButtonText = function () {
            if ($(that).attr('data-method') == "DELETE") {
                return "Delete";
            }
        };
        
        e.preventDefault();

        if ($(that).attr('data-confirm')) {
            $(
                '<div class="modal hide" id="myModal">' +
                    '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal">×</button>' +
                    '<h3>' + $(that).attr("data-header") + '</h3>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '<p>' + $(that).attr("data-confirm")  + '</p>' +
                    '</div' +
                    '<div class="modal-footer">' +
                        '<a href="#" class="btn" data-dismiss="modal">Close</a>' +
                        '<a id="accept" href="#" class="btn btn-primary">' + getAcceptButtonText() + '</a>' +
                    '</div>' +
                '</div>').appendTo('body');

            $('#accept').click(createFormAndSubmit);
            $('#myModal').modal();
        }
        else {
            createFormAndSubmit();    
        }   
    });
});
