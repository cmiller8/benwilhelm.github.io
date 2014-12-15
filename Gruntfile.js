var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-image-resize');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-shell');

grunt.initConfig({



	// ====================
	// TASK: concat
    // ====================
    concat: {
    	dist: {
    		options: {
    			separator: ';'
    		},
    		src: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/packery/dist/packery.pkgd.js',
                'bower_components/imagesloaded/imagesloaded.pkgd.js',
                'bower_components/fluidbox/jquery.fluidbox.js',
    			'_js/site.js'
    		],
    		dest: 'js/site.js'
    	}
    },

	// ===============
	// TASK: CONNECT
    // ===============
	connect: {
		dev: {
			options: {
				port: 4000,
				base: "_site",
				hostname: "127.0.0.1",
				livereload: true
			}
		}
	},


	// ====================
	// TASK: image_resize
    // ====================
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

	// ====================
	// TASK: jekyll
    // ====================
	jekyll: {
		dev: {
			options: {
				config: "_config.yml",
				verbose: true,
				raw: "exclude: [Gemfile, Gemfile.lock, bower.json, package.json, Gruntfile.js, node_modules]"
			}
		},

		prod: {
			options: {
				config: "_config.yml,_config_prod.yml",
				verbose: true,
				raw: "exclude: [Gemfile, Gemfile.lock, bower.json, package.json, Gruntfile.js, node_modules]"
			}
		}
	},


	// ====================
	// TASK: jshint
    // ====================
	jshint: {
		dist: ['_js/*.js']
	},


	// ====================
	// TASK: shell
    // ====================
	shell: {
		deploy: {
			command: "cd _site; git add -A; git commit -m 'Production build'; git push origin master;"
		}
	},


	// ====================
	// TASK: uglify
    // ====================
	uglify: {
		dev: {
			options: {
				beautify: true
			},

			files: {
				'js/site.min.js': ['js/site.js']
			}
		},

		prod: {
			files: {
				'js/site.min.js': ['js/site.js']
			},
			mangle: {
				except: ['jQuery']
			}
		}

	},



	// ====================
	// TASK: watch
    // ====================
	watch: {
		jekyll: {
			files: [
				'./**/*.html', 
				'./**/*.markdown', 
				'./**/*.yml', 
				'./**/*.scss',

				"!./node_modules/*",
				"!./_site/*"
			],
			tasks: ['jekyll:dev'],
			options: {
				livereload: true
			}
		},

		jshint: {
			files: ['_js/*.js'],
			tasks: ['jshint:beforeconcat']
		}
	}
});

grunt.registerTask('default', [
	'jshint:dist',
	'concat:dist',
	'uglify:dev',
	'jekyll:dev', 
	'connect:dev', 
	'watch:jekyll'
]);

grunt.registerTask('build_deploy', [
	'jshint:dist',
	'concat:dist',
	'uglify:prod',
	'jekyll:prod',
	'shell:deploy'
]);


grunt.registerTask('resize', ["image_resize:thumbs", "image_resize:large"]);
