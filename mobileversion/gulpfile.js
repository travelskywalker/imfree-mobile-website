var gulp = require('gulp');
// BowserSync
var browserSync = require('browser-sync');
// Process Sass
var sass = require('gulp-sass');
// Concat and Minfiy JS
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
// MinIfY HTML
var htmlmin = require('gulp-html-minifier');
// Minify CSS
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

// Browser Sync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Process SASS
gulp.task('sass', function () {
    // main css
    return gulp.src('./css/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// Concat and Minfiy JS
gulp.task('minify-js', function () {
    return gulp.src(['./js/lib/*.js', './js/custom/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// Minify CSS
gulp.task('minify-css', ['sass'], function () {
    return gulp.src('./css/main.css')
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css/'));
});


// Watch
gulp.task('watch', ['browserSync', 'minify-css', 'minify-js',], function () {
    gulp.watch('./css/scss/**/*.scss', ['sass']);
    gulp.watch(['./js/lib/*.js', './js/custom/*.js'], ['minify-js']);
    gulp.watch('./css/main.css', ['minify-css']);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./js/main.min.css', browserSync.reload);
    gulp.watch('./js/main.min.js', browserSync.reload);
    gulp.watch('./css/main.min.css', browserSync.reload);
});

gulp.task('build', ['minify-css', 'minify-js',], function () {

});

//------------------------------------------------------------------------//

// Production
// gulp.task('prod', ['minify-css', 'minify-js'], function () {
//     // Minify HTML
//     gulp.src('./*.html')
//         .pipe(htmlmin({collapseWhitespace: true}))
//         .pipe(gulp.dest('./dist'));
//     // Copy CSS
//     gulp.src('./css/main.min.css')
//         .pipe(gulp.dest('dist/css'));
//     // Copy JS
//     gulp.src('./js/main.min.js')
//         .pipe(gulp.dest('dist/js'));
//     // Copy Images
//     gulp.src('./img/**/*')
//         .pipe(gulp.dest('dist/img'));
//     // Copy Fonts
//     gulp.src('./fonts/*')
//         .pipe(gulp.dest('dist/fonts'));
// });
