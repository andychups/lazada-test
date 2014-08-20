var jade = require('jade'),
    fs = require('fs');

module.exports = require('enb/lib/build-flow').create()
    .name('jade')
    .target('target', '?.jade.js')
    .defineOption('exports', 'window')
    .defineOption('namespace', 'jadeTemplates')
    .useFileList('jade')
    .builder(function(sourceFiles) {
        var result;
        var namespace = this._namespace;
        var exports = this._exports;

        result = '(function (exports) { var ' + namespace + ' = exports.' + namespace + ' = {}; \n\n';

        result += sourceFiles.map(function(file) {
            var output = fs.readFileSync(file.fullname, { 'encoding': 'utf-8' });

            output = jade.compileClient(output, {
                'self': false,
                'compileDebug': false
            });

            output.replace(' template', '');
            output = namespace + '[\'' + file.name.substring(0, file.name.length - 5) + '\']=' + output + ';';

            return output;
        });

        result += '})('+exports+'); \n\n';

        return result;
    })
    .createTech();