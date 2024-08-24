import { atom } from "recoil";

const todo = atom({
  key: "todo",
  default: { title: "", description: "" },
});

const looptodos = atom({
  key: "looptodos",
  default: [],
});

const searchQuery = atom({
  key: "searchQuery",
  default: "",
});

export { todo, looptodos, searchQuery };
