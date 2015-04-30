var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var jsFiles = [
	'./lib/respond/dest/respond.min.js',
	'./lib/es5-shim/es5-shim.min.js',
	'./custom-lib/jquery/jquery-1.11.2.min.js',
	'./lib/modernizr/modernizr.js',
	'./lib/handlebars/handlebars.min.js',
	'./lib/svg4everybody/svg4everybody.ie8.min.js',
	'./lib/fastclick/lib/fastclick.js',
	'./lib/routie/dist/routie.min.js',
	'./lib/lunr.js/lunr.min.js',
	'./custom-lib/swag/swag.min.js'
];
 
gulp.task('buildjs', function() {
  return gulp.src(jsFiles)
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('./js'));
});