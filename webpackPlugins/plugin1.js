class Plugin1 {
  constructor() {}

  apply(compiler) {
    console.log("自定义插件开始执行");
    const { webpack } = compiler;
    const { Compilation, sources } = webpack;
    compiler.hooks.thisCompilation.tap("plugin1", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "plugin1",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          const content =
            "# 构建产物列表:\n\n" +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join("\n");
          compilation.emitAsset("readme.md", new sources.RawSource(content));
        }
      );
    });
  }
}

module.exports = Plugin1;
