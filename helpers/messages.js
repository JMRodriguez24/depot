module.exports = function (req, res) {
    return function () {
        var buf = [],
            messages = req.flash(),
            types = Object.keys(messages),
            len = types.length,
            i, j, type, msgs;

        if (!len) {
            return '';
        }
        
        buf.push('<div id="messages" class="row">');
        buf.push('  <div class="span4">');

        for (i = 0; i < len; ++i) {
            type = types[i];
            msgs = messages[type];

            if (msgs) {
                buf.push('    <div class="alert alert-' + type + '">');
                buf.push('      <a class="close">x</a>');
                buf.push('      <strong>' + type  + '!</strong>');
                buf.push('      <ul>');
                for (j = 0, l = msgs.length; j < l; ++j) {
                    var msg = msgs[j];
                    buf.push('<li>' + msg + '</li>');
                }

                buf.push('    </ul>');
                buf.push('    </div>');
            }
        }

        buf.push('  </div>');
        buf.push('</div>');
        return buf.join('\n');
    };
};
