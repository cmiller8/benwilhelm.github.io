var grunt = require('grunt');

grunt.loadNpmTasks('grunt-image-resize');
grunt.loadNpmTasks('grunt-jekyll');

grunt.initConfig({

	image_resize: {

		resize: {
			options: {
				width: 400
			},

			files: [{
				expand: true,
				cwd: "files/",
				src: "**/*.jpg",
				dest: "thumbs/",
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
				watch: true
			}
		}
	}
});

