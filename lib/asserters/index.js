var fs = require('fs'),
    exports = module.exports = asserters = {};

files = fs.readdirSync('lib/asserters');
for(var index in files) {
    var file = files[index],
        name = file.replace('.js', '');

    if(name != 'index') {
        asserters[name] = require(fs.realpathSync('lib/asserters/' + file));
    }
}
