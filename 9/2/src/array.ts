// 1
type numberArr = number[];
function max(arr: numberArr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 2
interface User20 {
  firstName: string;
  lastName: string;
  age: number;
}

function filteredUsers(users: User20[]) {
  return users.filter((x) => x.age >= 18);
}

console.log(
  filteredUsers([
    {
      firstName: "harkirat",
      lastName: "Singh",
      age: 21,
    },
    {
      firstName: "Raman",
      lastName: "Singh",
      age: 16,
    },
  ])
);
