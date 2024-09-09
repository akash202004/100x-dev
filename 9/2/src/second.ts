interface User {
  name: string;
  age: number;
}
function isLegal(user: User) {
  if (user.age > 18) {
    return true;
  } else {
    return false;
  }
}
function greet(user: User) {
  console.log(`Hello, ${user.name}`);
}

isLegal({
  name: "Akash",
  age: 20,
});
