var gulp = require('gulp'),
    minijs = require('gulp-uglify'),
    minicss = require('gulp-clean-css')


gulp.task('css',()=>{
    gulp.src('./frontend/public/css/*.css')
        .pipe(minicss())
        .pipe(gulp.dest('./backend/dist/css/'))
})

gulp.task('watch',()=>{
    gulp.watch('./frontend/public/css/*.css',['css']);
})

gulp.task('default',['watch']);
