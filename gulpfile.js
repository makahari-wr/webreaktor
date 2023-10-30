const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

let imagemin, gifsicle, mozjpeg, optipng;

async function loadDependencies() {
    imagemin = (await import('gulp-imagemin')).default;
    gifsicle = (await import('imagemin-gifsicle')).default;
    mozjpeg = (await import('imagemin-mozjpeg')).default;
    optipng = (await import('imagemin-optipng')).default;
}

const jsPaths = [
    'static/js/vendor/jquery-3.6.0.min.js',
    'static/js/vendor/waypoints.min.js',
    'static/js/sidebar.js',
    'static/js/bootstrap.bundle.min.js',
    'static/js/meanmenu.js',
    'static/js/backToTop.js',
    'static/js/swiper-bundle.min.js',
    'static/js/slick.min.js',
    'static/js/magnific-popup.min.js',
    'static/js/ajax-form.js',
    'static/js/jquery.appear.js',
    'static/js/jquery.odometer.min.js',
    'static/js/service-accordion.js',
    'static/js/chroma.min.js',
    'static/js/SplitText.min.js',
    'static/js/ScrollSmoother.min.js',
    'static/js/ScrollToPlugin.min.js',
    'static/js/ScrollTrigger.min.js',
    'static/js/gsap.min.js',
    'static/js/vanilla-tilt.js',
    'static/js/main.js'
];

function bundleAndMinifyJs() {
    return gulp.src(jsPaths)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
}

async function images() {
    await loadDependencies();

    return gulp.src('static/img/**/*')
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest('static/img'));
}

exports.images = images;
exports.bundleAndMinifyJs = bundleAndMinifyJs;
