// npm install grunt-postcss pixrem autoprefixer cssnano

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options:{
          style:'compressed',
          sourcemap: 'none'
        },
        files: {
          'styles.css' : 'scss/styles.scss'
        }
      }
    },
    postcss: {
      options: {
      map: false, // inline sourcemaps      

      processors: [
        require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: ['last 100000 versions','ie 8', 'ie 9', 'ie 10', 'ie 11']}), // add vendor prefixes
        require('cssnano')({zindex: false}) // minify the result
        ]
      },
      dist: {
        src: 'styles.css',
        dest: 'styles.css'
      },
    },
    notify: {
      postcss: {
        options: {
          title: 'Task Complete',  // optional
          message: 'Sass and PostCSS finished running', //required
        }
      }
    },
    watch: {
      set1: {
        files: 'scss/*.scss',
        tasks: ['sass', 'postcss']//, 'notify']
      }
    }
  });
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-notify');
grunt.registerTask('default',['watch']);
}