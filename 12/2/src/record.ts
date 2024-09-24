// ugly way to define object
interface User2 {
  id: number;
  name: string;
}

type UserKeys = {
  [key: string]: User2;
};

const users: UserKeys = {
  user1: { id: 1, name: "John" },
  user2: { id: 2, name: "Jane" },
};

// good way to define object
// Record comes here for make the code cleaner
type record = Record<string, { age: number; name: string }>;

const users2: record = {
  user1: { name: "John", age: 30 },
  user2: { name: "Jane", age: 25 },
};

users2["user1"].age = 44;

// map
const names = new Map();
names.set("albal", { id: "1", name: "albal" });
names.set("albal2", { id: "2", name: "albal2" });

names.get("albal2");
names.delete("albal2");

// another way to define map
type User5 = {
  id: number;
  name: string;
};
const names2 = new Map<string, User5>();
names2.set("albal", { id: 1, name: "albal" });
names2.set("albal2", { id: 2, name: "albal2" });

const get = names2.get("albal2");
console.log(get);
names2.delete("albal2");
