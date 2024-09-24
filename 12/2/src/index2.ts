type user13 = {
    readonly name: string;
    readonly age: number;
}

// type user13 = {
//     readonly name: string;
//     readonly age: number;
// }

const user: Readonly<user13> = {   
    name: "John",
    age: 30
}

// user.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.