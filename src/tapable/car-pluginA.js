const colors = require("colors");

class PluginA {
  constructor() {}

  apply(Car) {
    Car.hooks.speed.tap("newSpeed", () => {
      setTimeout(() => {
        console.log("使用插件A，速度提升至：", colors.yellow("500"));
      }, 4000);
    });

    Car.hooks.changeColor.tap("newColor", () => {
      setTimeout(() => {
        console.log("使用插件A, 新的汽车颜色是：", colors.red("红色"));
      }, 5000);
    });
  }
}

module.exports = PluginA;
