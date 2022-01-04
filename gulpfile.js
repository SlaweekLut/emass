// Названия файлов:
// 1. project_folder = Конечная папка
// 2. source_folder = Начальная папка

let project_folder = 'dist';
let source_folder = '#src';

// Пути до файлов:
// build: пути до конечных файлов
// src: пути до исходных файлов
// watch: пути до файлов под наблюдением
// clean: путь до конечного файла (Что-бы создать папку заново)

//? ** - все под папки
//? *. - все файлы с определеным расширением 
//? {} - перечень файлов

let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/assets/css/',
		scripts: project_folder + '/assets/scripts/',
		img: project_folder + '/assets/img/',
		pic: project_folder + '/assets/pic/',
		fonts: project_folder + '/assets/fonts/',
		helpers: project_folder + '/assets/helpers/',
		includes: project_folder + '/assets/includes/',
	},
	src: {
		html: [source_folder + '/*.{html,pug}', '!' + source_folder + '/_*.{html,pug}'],
		css: source_folder + '/assets/sass/style.sass',
		js: source_folder + '/assets/scripts/*.js',
		ts: source_folder + '/assets/scripts/script.ts',
		img: source_folder + '/assets/img/**/*.{jpeg,jpg,png,svg,gif,ico}',
		pic: source_folder + '/assets/pic/**/*.{jpeg,jpg,png,svg,gif,ico}',
		fonts: source_folder + '/assets/fonts/*.{eot,ttf,woff,woff2}',
		helpers: source_folder + '/assets/helpers/*',
		includes: source_folder + '/assets/includes/*',
	},
	watch: {
		html: source_folder + '/**/*.{html,pug}',
		css: source_folder + '/assets/sass/**/*.sass',
		js: source_folder + '/assets/scripts/**/*.js',
		ts: source_folder + '/assets/scripts/**/*.ts',
		img: source_folder + '/assets/img/**/*.{jpeg,jpg,png,svg,gif,ico}',
		pic: source_folder + '/assets/pic/**/*.{jpeg,jpg,png,svg,gif,ico}',
		includes: source_folder + '/assets/includes/*',
	},
	clean: "./" + project_folder + "/",
}

import gulp from "gulp";
import browsersync from "browser-sync";
import fileinclude from "gulp-file-include";
import del from "del";
import gulpSass from "gulp-sass";
import simpleSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import group_media from "gulp-group-css-media-queries";
import clean_css from "gulp-clean-css";
import cleanJs from "gulp-uglify-es";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import gifsicle from "imagemin-gifsicle";
import mozjpeg from "imagemin-mozjpeg";
import optipng from "imagemin-optipng";
import svgo from "imagemin-svgo";
import pug from 'gulp-pug';
import pugbem from 'gulp-pugbem';
import gulpts from "gulp-typescript";

const sass = gulpSass(simpleSass)
// Запуск сервера
export const browserSync = () => {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false,
	})
}

// Сборка html
export const html = () => {
	return gulp.src(path.src.html)
		.pipe(
			pug({
				plugins: [pugbem],
				pretty: true
			})
		)
		.pipe(fileinclude())
		.pipe(imagemin([
			svgo()
		]))
		.pipe(gulp.dest(path.build.html))
		.pipe(browsersync.stream())
}

// Сборка includes
export const includes = () => {
	return gulp.src(path.src.includes)
		.pipe(
			pug({
				plugins: [pugbem],
				pretty: true
			})
		)
		.pipe(fileinclude())
		.pipe(imagemin([
			svgo()
		]))
		.pipe(gulp.dest(path.build.includes))
		.pipe(browsersync.stream())
}

// Сборка images
export const images = () => {
	return gulp.src(path.src.img)
		.pipe(imagemin([
			gifsicle({ interlaced: true }),
			mozjpeg({ quality: 75, progressive: true }),
			optipng({ optimizationLevel: 5 }),
		]))
		.pipe(gulp.dest(path.build.img))
		.pipe(browsersync.stream())
}

export const picture = () => {
	return gulp.src(path.src.pic)
		.pipe(imagemin([
			gifsicle({ interlaced: true }),
			mozjpeg({ quality: 75, progressive: true }),
			optipng({ optimizationLevel: 5 }),
			svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest(path.build.pic))
		.pipe(browsersync.stream())
}

// Сборка js
export const js = () => {
	return gulp.src(path.src.js)
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.scripts))
		.pipe(cleanJs.default())
		.pipe(rename({ extname: ".min.js" }))
		.pipe(gulp.dest(path.build.scripts))
		.pipe(browsersync.stream())
}

// Сборка ts
export const ts = () => {
	return gulp.src(path.src.ts)
		.pipe(gulpts())
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.scripts))
		.pipe(cleanJs.default())
		.pipe(rename({ extname: ".ts.min.js" }))
		.pipe(gulp.dest(path.build.scripts))
		.pipe(browsersync.stream())
}

// Сборка css из sass
export const css = () => {
	return gulp.src(path.src.css)
		.pipe(sass({ outputStyle: 'expanded', }).on('error', sass.logError))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 version'],
				cascade: true
			})
		)
		.pipe(group_media())
		.pipe(gulp.dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({ extname: ".min.css" }))
		.pipe(gulp.dest(path.build.css))
		.pipe(browsersync.stream())
}

// Fonts
export const fonts = () => {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browsersync.stream())
}

// Helpers
export const helpers = () => {
	return gulp.src(path.src.helpers)
		.pipe(gulp.dest(path.build.helpers))
		.pipe(browsersync.stream())
}

// Моментальное обновление файлов
export const watchFiles = () => {
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.ts], ts);
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.pic], picture);
	gulp.watch([path.watch.includes], includes);
}

// Создание папки заного
export const clean = () => {
	return del(path.clean)
}

export default gulp.series(
	clean,
	gulp.parallel(
		js,
		ts,
		css,
		html,
		images,
		picture,
		fonts,
		helpers,
		includes,
	),
	gulp.parallel(
		js,
		ts,
		css,
		html,
		images,
		picture,
		fonts,
		helpers,
		includes,
		watchFiles,
		browserSync)
);