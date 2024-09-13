// problem
type input = string | number;

function myname(name: input[]) {
  return name[0];
}

myname(["ada", 1, 2, "adas"]);

// generics
function idnetity<T>(arg: T): T {
  return arg;
}

let output = idnetity<string>("myString");
output.toUpperCase();
let output2 = idnetity<number>(1);

function idnetity1<T>(arg: T[]): T {
  return arg[0];
}

interface usercal {
  name: String;
}

let output22 = idnetity(["myString", "myString"]);
let out = idnetity1<usercal>([{ name: "myString" }]);
let output223 = idnetity([1, 2, 3, 4]);
let output224 = idnetity([true, false]);
