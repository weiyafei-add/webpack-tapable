import dayjs from "dayjs";
window.addEventListener("load", () => {
  const root = document.getElementById("root");

  root.addEventListener("click", () => {
    import("lodash").then((res) => {
      console.log(res);
    });
  });

  console.log(dayjs().format("YYYYMMDD"));

  const a = ["a", "b", "c"];

  const b = [...a, "foo"];

  const foo = (v) => {
    console.log(v);
  };

  foo(b);
});
