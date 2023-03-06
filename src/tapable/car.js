const colors = require("colors");
const { SyncHook } = require("tapable");
const PluginA = require("./car-pluginA");
let date = 3;
class Car {
  constructor(options) {
    this.hooks = {
      speed: new SyncHook(["speed"]),
      changeColor: new SyncHook(["color"]),
    };
    let plugins = options.plugins;
    if (plugins && plugins.length > 0) {
      plugins.forEach((plugin) => plugin.apply(this));
    }
  }

  run() {
    console.log(
      `汽车开始启动, 默认速度为: ${colors.green(
        "200"
      )}, 默认颜色为：${colors.green("黑色")}`
    );
    const time = setInterval(() => {
      date === 0 ? clearInterval(time) : console.log(date--);
    }, 1000);
    this.speed();
    this.changeColor();
  }

  speed() {
    this.hooks.speed.call(200);
  }

  changeColor() {
    this.hooks.changeColor.call("red");
  }
}

const options = {
  plugins: [new PluginA()],
};

const CarInstance = new Car(options);

CarInstance.run();
