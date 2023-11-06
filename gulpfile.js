import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg"
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
return gulp.src('docs/sass/style.scss', { sourcemaps: true })
.pipe(plumber())
.pipe(sass().on('error', sass.logError))
.pipe(postcss([
autoprefixer(),
csso()
]))
.pipe(rename('style.min.css'))
.pipe(gulp.dest('build/css', { sourcemaps: '.' }))
.pipe(browser.stream());
}

// HTML

const html = () => {
return gulp.src('docs/*.html')
.pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
return gulp.src('docs/js/*.js')
.pipe(gulp.dest('build/js'))
.pipe(browser.stream());
}

// Images

const optimizeImages = () => {
return gulp.src('docs/img/**/*.{png,jpg}')
.pipe(squoosh())
.pipe(gulp.dest('build/img'))
}

const copyImages = () => {
return gulp.src('docs/img/**/*.{png,jpg}')
.pipe(gulp.dest('build/img'))
}

// WebP

const createWebp = () => {
return gulp.src('docs/img/**/*.{png,jpg}')
.pipe(squoosh({
webp: {}
}))
.pipe(gulp.dest('build/img'))
}

// SVG

const svg = () =>
gulp.src(['docs/img/*.svg', '!docs/img/icons/*.svg'])
.pipe(svgo())
.pipe(gulp.dest('build/img'));

function makeStack () {
return gulp.src('docs/img/icons/*.svg')
.pipe(stacksvg({ output: 'stack' }))
.pipe(gulp.dest('build/img'))
}

// Copy

const copy = (done) => {
gulp.src([
'docs/fonts/*.{woff2,woff}',
'docs/*.ico',
'docs/*.webmanifest'
], {
base: 'docs'
})
.pipe(gulp.dest('build'))
done();
}

// Clean

const clean = () => {
return del('build');
};

// Server

const server = (done) => {
browser.init({
server: {
baseDir: 'build'
},
cors: true,
notify: false,
ui: false,
});
done();
}

// Reload

const reload = (done) => {
browser.reload();
done();
}

// Watcher

const watcher = () => {
gulp.watch('docs/sass/**/*.scss', gulp.series(styles));
gulp.watch('docs/js/script.js', gulp.series(scripts));
gulp.watch('docs/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
clean,
copy,
optimizeImages,
gulp.parallel(
styles,
html,
scripts,
svg,
makeStack,
createWebp
),
);

// Default

export default gulp.series(
clean,
copy,
copyImages,
gulp.parallel(
styles,
html,
scripts,
svg,
makeStack,
createWebp
),
gulp.series(
server,
watcher
));
