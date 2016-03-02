var gulp       = require("gulp"),
    livereload = require("gulp-livereload"),
    paths      = {
        js   : "./js/*.js",
        specs: "./js/specs/**/*.js"
    };

gulp.task("reload", function () {
    gulp.src(paths.js, {read: false})
        .pipe(livereload({
        reloadPage: "http://localhost/web/libraries/shift-click/specs/SpecRunner.html"
    }));

});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(paths.specs, ['reload']);
});