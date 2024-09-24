"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const age = sumOfAge({ name: "John", age: 20 }, { name: "Jane", age: 30 });
console.log(age);
