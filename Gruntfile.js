module.exports = function(grunt) {

  if (grunt.file.exists('conf/jsHint.json')) {
    var jsHintOptions = grunt.file.readJSON('conf/jsHint.json');
  }

  grunt.initConfig({
    globalConfig : {
      src : 'src',
      dest : 'dist'
    },
    pkg : grunt.file.readJSON('package.json'),
    jshint : {
      options : jsHintOptions,
      all : ['<%= globalConfig.src %>/js/jquery.mightybox.js']
    },
    uglify : {
      options : {
        mangle : true,
        banner : '/**\n * <%= pkg.name %> - <%= pkg.description %>\n * \n * @version <%= pkg.version %>\n * @author <%= pkg.author %>\n * @license <%= pkg.license %>\n */\n\n'
      },
      my_target : {
        files : {
          '<%= globalConfig.dest %>/js/jquery.mightybox-<%= pkg.version %>.min.js' : '<%= globalConfig.src %>/js/jquery.mightybox.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['jshint', 'uglify']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['build']);
};
