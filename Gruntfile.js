module.exports = function(grunt) {
	 
  // configure the tasks
  grunt.initConfig({
 
	 /*
		cwd : directory the source files are relative to
		src:
		dest:output the result of the task.
		build: copy the content to the build directory.
		expand=true to enable all of these options
		
	 */
	copy: {
	  build: {
		cwd: 'app',
		src: [ '**' ],
		dest: 'build',
		expand: true
	  },
	},
	
	clean: {
	  build: {
		src: [ 'build' ]
	  },
	},

	cssmin: {
	  build: {
		files: {
		  'build/styles/application.css': [ 'build/styles/**/*.css' ]
		}
	  }
	},
	// require js optimization
	requirejs: {
		compile: {
			options: {
				// name is required
				name: "appMain",
				// the base path of our optimization
				baseUrl: "./build/scripts",
				paths: {
					jquery: '../lib/jquery/jquery.min',
					angular: '../lib/angular/angular.min',
					uiRouter: '../lib/angular-ui-router/release/angular-ui-router.min',
					jqueryLoadMask : '../lib/jquery-loadmask/jquery.loadmask.min',
					helpers: './helpers/eshop.helpers',
					config: './configs/eshop.configs',      
					adminModule: './modules/adminModule',
					interceptors: './modules/interceptors/interceptors',
					commonModule: './modules/commonModule',
					directiveDefinition: './directives/directiveDefinition',
				},
				shim: {
					"uiRouter":{
						deps : ['angular']
					},
					"jqueryLoadMask":{
						deps: ['jquery']
					},					
					'config': {
						deps: ['jquery']
					},
					'helpers': {
						deps: ['jquery']
					},
				},
				
				// include almond to get define (in place of <span class="skimlinks-unlinked">require.js</span>)
				//include: "../lib/almond-0.2.5",
				// use our original main configuration file to avoid
				// duplication.  this file will pull in all our dependencies
				mainConfigFile: "build/scripts/appMain.js",
				optimize: "none",
				inlineText: true,
				removeCombined: true,
				// the output optimized file name
				out: "build/scripts/application.js"
			}
		}
	}

 
  });
	 
	// load the tasks  from the grunt-contrib-copy package
	// run by typing grunt copy
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	// define the tasks
	grunt.registerTask(
	  'stylesheets', 
	  'Compiles the stylesheets.', 
	  [ 'cssmin' ]
	);
	
	grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  [ 'clean', 'copy','stylesheets','requirejs' ]
	);
 
	// define the tasks
};