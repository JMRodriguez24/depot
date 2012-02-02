jQuery(function ($) {
    $('a[data-confirm], input[data-confirm]').live('click', function (e) {
        // if user clicks cancel don't do anything
        if (!confirm($(this).attr('data-confirm'))) {
            return false;
        }

        var link = $(this),
        href = link.attr('href'),
        method = link.attr('data-method'),
        form = $('<form method="post" action="' + href + '">'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

        form.hide()
            .append(metadata_input)
            .appendTo('body');

        e.preventDefault();
        form.submit();
    });
});
