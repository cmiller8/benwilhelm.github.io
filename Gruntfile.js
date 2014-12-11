var grunt = require('grunt');

grunt.loadNpmTasks('grunt-image-resize');
grunt.loadNpmTasks('grunt-jekyll');

grunt.initConfig({

	image_resize: {

                thumbs: {
			options: {
				width: 400,
                                overwrite: false
			},

			files: [{
				expand: true,
				cwd: "files/originals/",
				src: "**/*.jpg",
				dest: "files/thumbs/",
				ext: ".jpg",
				extDot: "first"
			}]
		},

                large: {
			options: {
				width: 1200, 
                                overwrite: false
			},

			files: [{
				expand: true,
				cwd: "files/originals/",
				src: "**/*.jpg",
				dest: "files/large/",
				ext: ".jpg",
				extDot: "first"
			}]
		}



	},

	jekyll: {

		dist: {
			options: {
				config: "_config.yml",
				serve: true,
				watch: true,
				verbose: true,
				quiet: false,
				detach: false
			}
		}
	}
});

grunt.registerTask('default', ["jekyll:dist"]);
grunt.registerTask('resize', ["image_resize:thumbs", "image_resize:large"]);
