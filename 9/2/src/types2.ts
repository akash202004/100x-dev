// types can be multiple types and interface cant be multiple types
type greet2 = number | string;
function akash(id: greet2) {
  console.log(id);
}

akash(1);
akash("1");

// types can do union and intersection
// interface can extends a class
type employee = {
  name: string;
  age: number;
};

interface manager {
  name: string;
  role: string;
}

type mixture = employee & manager;
type mixture2 = {
  name: string;
  age: number;
  role: string;
};
