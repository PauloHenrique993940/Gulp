import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";

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

// Tarefa principal que agrupa as outras tarefas
export default function () {
    // Monitoramento das mudanças nos arquivos
    gulp.watch("./source/styles/*.scss", gulp.series(compilarSass));
    gulp.watch("./source/images/*", gulp.series(compimeImagen));
    gulp.watch("./source/scripts/*.js", gulp.series(minificarJS));
}
