const { SyncHook, AsyncHook, SyncBailHook } = require("tapable");
const hook = new SyncHook(["a"]);

hook.tap("task1", (name, type) => {
  console.log("task1", name, type);
});
hook.tap("task2", (name) => {
  console.log("task2", name);
});

hook.call("donw", "2");
