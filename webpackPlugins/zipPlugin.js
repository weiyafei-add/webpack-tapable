const jsZip = require("jszip");
const path = require("path");
const fs = require("fs");

class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      const zip = new jsZip();
      const folder = zip.folder(this.options.foldName);
      const stats = compilation.getStats().toJson();
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source();
        folder.file(filename, source);
      }
      zip
        .generateAsync({
          type: "nodebuffer",
        })
        .then((contentBuffer) => {
          const outputPath = path.join(
            compilation.options.output.path,
            this.options.foldName + ".zip"
          );
          const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath``
          );
          fs.writeFileSync(outputRelativePath, contentBuffer);
        });

      callback();
    });
  }
}

module.exports = ZipPlugin;
