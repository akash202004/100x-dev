// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
var direction;
(function (direction) {
    direction[direction["up"] = 0] = "up";
    direction[direction["down"] = 1] = "down";
    direction[direction["left"] = 2] = "left";
    direction[direction["right"] = 3] = "right";
})(direction || (direction = {}));
function key(keyPressed) {
    return keyPressed;
}
key(direction.up);
key(direction.down);
// key("sdasdas");
