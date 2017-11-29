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
// Compile Jade/ HTML
var jade = require('gulp-jade');

// Process Jade
gulp.task('jade', function() {
  gulp.src('src/jade/*.jade')
    .pipe(jade({
      pretty: true,
    }))
    .pipe(gulp.dest('./src/'))
});

// Browser Sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// Process SASS
gulp.task('sass', function(){
  // main css
  return gulp.src('src/css/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Concat and Minfiy JS
gulp.task('minify-js', function() {
    return gulp.src(['src/js/lib/*.js', 'src/js/custom/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

// Minify CSS
gulp.task('minify-css', function() {
    return gulp.src('src/css/main.css')
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/css/'));
});


// Watch
gulp.task('watch', ['browserSync', 'jade', 'sass', 'minify-css', 'minify-js', ], function (){
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/css/scss/**/*.scss', ['sass']);
  gulp.watch(['src/js/lib/*.js', 'src/js/custom/*.js'], ['minify-js']);
  gulp.watch('src/css/main.css', ['minify-css']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/main.min.css', browserSync.reload);
  gulp.watch('src/js/main.min.js', browserSync.reload);
  gulp.watch('src/css/main.min.css', browserSync.reload);
});

//------------------------------------------------------------------------//

// Build
gulp.task('build', ['jade', 'sass','minify-css', 'minify-js'], function (){
  // Minify HTML
  gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
  // Copy CSS
  gulp.src('src/css/bootstrap.min.css')
    .pipe(gulp.dest('build/css'));
  gulp.src('src/css/fixed-positioning.min.css')
    .pipe(gulp.dest('build/css'));
  gulp.src('src/css/main.min.css')
    .pipe(gulp.dest('build/css'));
  // Copy JS
  gulp.src('src/js/main.min.js')
    .pipe(gulp.dest('build/js'));
  // Copy Images
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'));
  // Copy Fonts
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});
