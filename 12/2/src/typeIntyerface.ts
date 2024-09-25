import { z } from 'zod';

// Define a schema using zod
const mySchema = z.object({
  name: z.string(),
  age: z.number(),
  isActive: z.boolean(),
});

type myObj = z.infer<typeof mySchema>;

const myOBBj : myObj={
    name: 'albal',
    age: 22,
    isActive: true
}

console.log(myOBBj); // { name: 'albal', age: 22, isActive: true }