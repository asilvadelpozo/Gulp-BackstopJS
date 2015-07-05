var gulp = require('gulp'),
    shell = require('gulp-shell'),
    del = require('del');

var backstop_path = './node_modules/backstopjs',
    test_path = './tests';

//Configure task
gulp.task('backstopjs-configure', function() {
    return gulp.src('')
        .pipe(shell(['sudo npm install'], { cwd: backstop_path }));
});

//GenConfig task
gulp.task('backstopjs-genConfig', function() {
    return gulp.src('')
        .pipe(shell(['gulp genConfig'], { cwd: backstop_path }));
});

//Reference task
gulp.task('reference', function() {
    return gulp.src('')
        .pipe(shell(['gulp reference'], { cwd: backstop_path }));
});

gulp.task('copy-reference-files', function() {
    return gulp.src(backstop_path + '/bitmaps_reference/**/*')
               .pipe(gulp.dest(test_path + '/bitmaps_reference'));
});

gulp.task('backstopjs-reference', ['reference'], function() {
    gulp.start('copy-reference-files');
});

//test task
gulp.task('test', function() {
    return gulp.src('')
        .pipe(shell(['gulp test'], { cwd: backstop_path }));
});

gulp.task('copy-test-files', function() {
    return gulp.src(backstop_path + '/bitmaps_test/**/*')
        .pipe(gulp.dest(test_path + '/bitmaps_test'));
});

gulp.task('backstopjs-test', ['test'], function() {
    gulp.start('copy-test-files');
});

//Setup task
gulp.task('clean-reference', function(cb) {
    del(backstop_path + '/bitmaps_reference', cb)
});

gulp.task('backstopjs-setup', ['clean-reference'], function() {
    return gulp.src(test_path + '/bitmaps_reference/**/*')
        .pipe(gulp.dest(backstop_path + '/bitmaps_reference'));
});

//Clean-tests task
gulp.task('backstopjs-clean-tests', function(cb) {
    del([backstop_path + '/bitmaps_test', test_path + '/bitmaps_test'], cb)
});