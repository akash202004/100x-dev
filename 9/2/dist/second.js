function isLegal(user) {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
function greet(user) {
    console.log("Hello, ".concat(user.name));
}
isLegal({
    name: "Akash",
    age: 20,
});
