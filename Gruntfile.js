module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        twigRender: {
            your_target: {
                files: [{
                    data: 'data.json',
                    expand: true,
                    cwd: 'templates/',
                    src: ['**/*.twig', '!**/_*.twig'], // Match twig templates but not partials
                    dest: 'dist/',
                    ext: '.html' // index.twig + datafile.json => index.html
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-twig-render');
    grunt.loadNpmTasks('grunt-prettify');

    // Default task(s).
    grunt.registerTask('default', ['twigRender']);

};
