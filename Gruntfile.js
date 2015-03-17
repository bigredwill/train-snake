'use strict';

module.exports = function (grunt) {
  // load jshint plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      all: [
        'Gruntfile.js',
        'train/js/*.js',
        '!train/js/vendor/*.js'
      ]
    },
    connect: {
      server: {
        options: {
          port: 8008,
          base: 'train',
          keepalive: true
          // open : {
          //   target: 'http://localhost:8008',
          //   appName: 'open'
          // }
        }
      }
    }
  });
};