var gulp       = require("gulp"),
    livereload = require("gulp-livereload"),
    paths      = {
        js   : "./js/*.js",
        specs: "./js/specs/**/*.js",
        allJS: [
            "./js/specs/**/*.js",
            "./js/*.js"
        ]
    };

//noinspection JSUnresolvedFunction
gulp.task("reload", function () {
    //noinspection JSUnresolvedFunction
    gulp.src(paths.js, {read: false})
        .pipe(livereload({
            reloadPage: "http://localhost/web/libraries/shift-click/specs/SpecRunner.html"
        }))
        .pipe(livereload({
            reloadPage: "http://localhost/web/libraries/shift-click/index.html"
        }));

});

//noinspection JSUnresolvedFunction
gulp.task("watch", function () {
    //noinspection JSUnresolvedFunction
    livereload.listen();
    //noinspection JSCheckFunctionSignatures
    gulp.watch(paths.allJS, ['reload']);
});