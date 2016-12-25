var gulp = require('gulp');

// PLUGINS
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', ()=>{
	return gulp.src('dev/sass/main.sass')
		.pipe(sass())
		.pipe(gulp.dest('public/css/'));
});

gulp.task('js', ()=>{
	return gulp.src('dev/js/*.js')
	.pipe(concat('script.js'))
	.pipe(gulp.dest('public/js/'))
});