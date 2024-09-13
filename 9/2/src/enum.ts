// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.

type enumLogic = "up" | "down" | "left" | "right";

enum direction {
  up,
  down,
  left,
  right,
}

// enum direction {
//   up = "up",
//   down = "down",
//   left = "left",
//   right = "right",
// }

function key(keyPressed: direction) {
  return keyPressed;
}

key(direction.up);
key(direction.down);
// key("sdasdas");
