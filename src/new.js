import { join } from "path";
import vfs from "vinyl-fs";
import through from "through2";

exports.run = function(name, other) {
  const cwd = join(__dirname, "../template");
  const dest = process.cwd();
  console.log(`新建一个项目在： ${dest}.`);
  console.log();

  vfs
    .src(["**/*", "!node_modules/**/*"], { cwd: cwd, cwdbase: true, dot: true })
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on("end", function() {
      console.log("新建项目完成");
    })
    .resume();
  function template(dest, cwd) {
    return through.obj(function(file, enc, cb) {
      if (!file.stat.isFile()) {
        return cb();
      }
      console.log(file.path.replace(cwd + "/", ""));
      this.push(file);
      cb();
    });
  }
};
