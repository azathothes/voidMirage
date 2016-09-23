var gulp = require('gulp'),
    minijs = require('gulp-uglify'),
    minicss = require('gulp-clean-css')

gulp.task('css',()=>{
    gulp.src('./frontend/public/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('./backend/dist/css/'))
})
gulp.task('js',()=>{
    gulp.src('./frontend/public/js/*.js')
        .pipe(minijs())
        .pipe(gulp.dest('./backend/dist/js/'))
})

gulp.task('watch',()=>{
    gulp.watch('./frontend/public/css/*.css',['css']);
    gulp.watch('./frontend/public/js/*.js',['js'])
})

gulp.task('default',['watch']);
