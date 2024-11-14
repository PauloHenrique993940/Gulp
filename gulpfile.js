const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");

// Tarefa de otimização de imagens
function compimeImagen() {
    return gulp.src("./source/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"));
}

// Tarefa de compilação do SASS
function compilarSass() {
    return gulp.src("./source/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist/styles"));
}

// Tarefa de minificação de JavaScript
function minificarJS() {
    return gulp.src("./source/scripts/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/scripts"));
}

// Tarefa principal que agrupa as outras tarefas e monitora as mudanças
function watchFiles() {
    gulp.watch("./source/styles/*.scss", { ignoreInitial: false }, gulp.series(compilarSass));
    gulp.watch("./source/images/*", { ignoreInitial: false }, gulp.series(compimeImagen));
    gulp.watch("./source/scripts/*.js", { ignoreInitial: false }, gulp.series(minificarJS));
}

exports.default = watchFiles;
