jQuery(function ($) {
    $('a[data-confirm], input[data-confirm]').live('click', function (e) {
        var that = this;
        var dialog = new ui.Confirmation({ message: $(that).attr('data-confirm') });
        e.preventDefault();
        dialog.show(function (ok) {
            if (ok) {
                var link = $(that),
                href = link.attr('href'),
                method = link.attr('data-method'),
                form = $('<form method="post" action="' + href + '">'),
                metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

                form.hide()
                .append(metadata_input)
                .appendTo('body');
                
                form.submit();
            }
            else {
                return;
            }
        });
    });

    $('a.close').live('click', function (e) {
        $(this).parent().parent().parent('div#messages').remove();
    });
});
