# Assignment 1

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>
        Sum
    </h1>
    <input type="text" id="sum1">
    <input type="text" id="sum2">
    <button id="sum">Sum</button>
    <h1 id="ans"></h1>


    <script>
        document.querySelector("#sum").addEventListener("click", () => {
            let sum1 = document.querySelector("#sum1").value;
            let sum2 = document.querySelector("#sum2").value;
            let ans = parseInt(sum1) + parseInt(sum2);
            document.querySelector("#ans").innerHTML = ans;
        })
    </script>
</body>

</html>
```
