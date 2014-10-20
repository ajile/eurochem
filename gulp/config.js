var dest = "./build";
var src = './src';

var client = "./client/";
var server = "./server/";
var serverPublic = server + "public/";

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for less sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + "/**",
            // Exclude Map files
            "!" + dest + "/**.map"
        ]
    },

    less: {
        src: client + "stylesheets/*[less]",
        dest: serverPublic + "stylesheets/"
    },

    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    },
    markup: {
        src: src + "/htdocs/**",
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // Additional file extentions to make optional
        // extensions: ['.coffee', '.hbs'],

        // A separate bundle will be generated for each
        // bundle config in the list below
        // bundleConfigs: [{
        //     entries: './src/javascript/app.coffee',
        //     dest: dest,
        //     outputName: 'app.js'
        // }, {
        //     entries: './src/javascript/head.coffee',
        //     dest: dest,
        //     outputName: 'head.js'
        // }]
        bundleConfigs: [{
            entries: './client/javascripts/app.js',
            dest: serverPublic + "javascripts/",
            outputName: 'app.js'
        }]
    },
    test: {
        testUrl: server + 'test/*.js',
        srcUrl: server + '*.js',
        options: {reporter: 'list'}
    }
};