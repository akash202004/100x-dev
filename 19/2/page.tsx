// export default async Home(){
//     const response = await fetch('https://api.example.com/items', {
//         next: {
//             revalidate:10
//         }
//     });
//     const data = await response.json();
//     console.log("data found");

//     return (
//         <div>
//         {data,todos.map(todo => (
//             <div key={todo.id}>{todo.title}</div>
//         )
//         )}
//         </div>
//     )
// }