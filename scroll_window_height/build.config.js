module.exports = {
	port: 8001,

	files: {
		ts: {
			app: [
				'defs/**/*.ts',
				'src/js/app.ts',
				'src/js/**/*.ts'
			]
		},
		js: {
			// Use uncompressed versions of 3rd-pary libraries.
			// They will be compressed in production.
			// Any libraries added to /vendor must be added here.
			// If you remove a library you must remove it here too.
			vendor: [
				 'vendor/angular/angular.js',
				 'vendor/angular-ui-router/release/angular-ui-router.js',
				 'vendor/ngDialog/js/ngDialog.js'
			],

			buildDest: '/js'
		},

		css: {
			main: [
				'scss/**/*.scss',
				'vendor/ngDialog/css/*.css',
				'src/**/*.scss',
				'!src/assets/*.scss',
				'!src/assets/**/*.scss',
				'src/common/**/*.scss',
				'src/components/**/*.scss',
			],

			buildDest: '/css'
		},
		html: {
			index: 'src/index.html',

			tpls: {
				all: ['src/**/*-template.html']
			},

			buildDest: ''
		},

		img: {
			src: [
				'src/img/*.jpg',
				'src/img/*.jpeg',
				'src/img/*.gif',
				'src/img/*.png',
				'src/img/**/*.jpg',
				'src/img/**/*.gif',
				'src/img/**/*.jpeg',
				'src/img/**/*.png',
				'src/img/**/*.gif',
				'src/img/**/*.svg'
			],
			buildDest: '/img'
		},

		assets: {
			src: [
				'src/assets/**'
			],
			buildDest: '/assets'
		},

		json: {
			src: [
				'src/json/**/*.json'
			],
			buildDest: '/json'
		},
		svg: {
			src: 'src/assets/images/svgs/src/*.svg',
			dest: 'src/assets/images/svgs/dest'
		},
		fonts: {
			src: [
				'fonts/**/*',
			],
			buildDest: '/fonts'
		}
	}
};