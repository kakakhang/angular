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
		main: {
            files: [
                {expand: true, cwd: 'app/',src: ['*'], dest: 'build/',filter: 'isFile'},
                {expand: true, cwd: 'app/',src: ['images/**/*'], dest: 'build/'},
				{expand: true, cwd: 'app/',src: ['lib/select2/select2.png'], dest: 'build/images/select2/', flatten: true},
				{expand: true, cwd: 'app/',src: ['lib/select2/select2x2.png'], dest: 'build/images/select2/', flatten: true},
				{expand: true, cwd: 'app/',src: ['lib/select2/select2-spinner.gif'], dest: 'build/images/select2/', flatten: true},
                {expand: true, cwd: 'app/',src: ['views/**/*'], dest: 'build/'},
				// flattens results to a single level
                {expand: true, cwd: 'app/',src: ['lib/requirejs/require.js'], dest: 'build/', flatten: true},
                // includes files within path
                {expand: true,cwd: 'app/', src: ['scripts/controllers/**/*'], dest: 'build/'},                
                {expand: true, cwd: 'app/',src: ['scripts/services/**/*'], dest: 'build/'},
                {expand: true, cwd: 'app/',src: ['scripts/directives/imageUpload.js'], dest: 'build/'},
            ],
        },
        replaceDataMain: { expand:true, cwd: 'app/', src: 'index.html', dest: 'build/',
            options: {
                processContent: function (content, srcpath) {				
					content = content.replace(/\.\/lib\/requirejs\/require.js/gi,"require.js");
                    return content.replace(/scripts\/appMain/gi,"application");
                }
            },            
        },
		replaceCss: { expand:true, cwd: 'build/', src: 'application.css', dest: 'build/',
            options: {
                processContent: function (content, srcpath) {
					content = content.replace(/select2\.png/gi,"images/select2/select2.png");
					content = content.replace(/select2x2\.png/gi,"images/select2/select2x2.png");
					content = content.replace(/select2-spinner\.gif/gi,"images/select2/select2-spinner.gif");
                    return content.replace(/\.\.\/\.\.\/images/gi,"images");
                }
            },            
        },		
	},
	
	processhtml: {
		options: {
		  data: {
			message: 'Replace link and script to production link'
		  }
		},
		dist: {
		  files: {
			'build/index.html': ['build/index.html']
		  }
		}
	},

	clean: {
	  build: {
		src: [ 'build' ]
	  },
	},

	cssmin: {
	  build: {
		files: {
		  'build/application.css': [ 'app/styles/**/*.css','app/lib/jquery-ui/themes/smoothness/jquery-ui.css' ,'app/lib/select2/select2.css']
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
				baseUrl: "./app/scripts",
				paths: {
					jquery: '../lib/jquery/jquery.min',
					jqueryUi: '../lib/jquery-ui/ui/jquery-ui',
					angular: '../lib/angular/angular.min',
					angularUiDate : '../lib/angular-ui-date/src/date',
					angularUiSelect2 : '../lib/angular-ui-select2/src/select2',
					select2 : '../lib/select2/select2.min',
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
					"angular":{
						deps : ['jquery']
					},
					"select2":{
						deps : ['jquery']
					},
					"uiRouter":{
						deps : ['angular']
					},
					"jqueryUi":{
						deps : ['jquery']
					},
					"angularUiDate":{
						deps : ['jqueryUi','angular']
					},
					"angularUiSelect2":{
						deps : ['jquery','select2','angular']
					},
					"jqueryLoadMask": {
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
				mainConfigFile: "app/scripts/appMain.js",
				//optimize: "none",
				inlineText: true,
				removeCombined: true,
				// the output optimized file name
				out: "build/application.js"
			}
		}
	}

 
  });
	 
	// load the tasks  from the grunt-contrib-copy package
	// run by typing grunt copy
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks('grunt-processhtml');
	
	// define the tasks
	grunt.registerTask(
	  'stylesheets', 
	  'Compiles the stylesheets.', 
	  [ 'cssmin' ]
	);
	
	grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  [ 'clean', 'copy','processhtml','stylesheets','copy:replaceCss','requirejs']
	);
 
	// define the tasks
};