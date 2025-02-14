import express from 'express';
import cluster from 'cluster';
import os from 'os';
import { parse } from 'path';

const totalCpuCore = os.cpus().length;  // Correct way to get the number of CPU cores
const port = 3000;

if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${totalCpuCore}`);
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < totalCpuCore; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        console.log("Lets fork another cluster")

        cluster.fork();
    })
} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);

    app.get("/", (_, res) => {
        res.send("Hello World");
    })

    app.get("/api/:n", function (req, res) {
        let n = parseInt(req.params.n)
        let sum = 0;

        if (n > 5000000000) n = 5000000000

        for (let i = 0; i < n; i++) {
            sum += i;
        }

        res.send(`Final count is ${sum} --- ${process.ppid}`)
    })

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    })
}