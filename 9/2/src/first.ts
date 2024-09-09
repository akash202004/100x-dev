// type
function greet(fullname: string): any {
  console.log("Hello World" + fullname);
}

greet("John Doe");

// type inference
function add(a: number, b: number): number {
  return a + b;
}

// function pass as an argument
function myname(fn: () => void) {
  setTimeout(fn, 1000);
}

myname(() => console.log("Hello World"));
