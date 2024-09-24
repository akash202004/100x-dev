// pick values from an instance and types
interface User {
  name: string;
  age: number;
  class: string;
  email: string;
  password: string;
}

type userPick = Pick<User, "name" | "age" | "class">;

// partial -> make all values optional
type updateUser = Partial<userPick>;

function myName(user: updateUser) {
  return user.name;
}

myName({ name: "John" });
