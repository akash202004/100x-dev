import { createClient } from "redis";

const client = createClient();

async function startWorker() {
  client.connect();
  while (1) {
    const response = await client.brPop("submission", 0);
    console.log(response);
    // actual worker code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // send it to the pub-sub channel
    console.log("processed users submissiosn");
  }
}

startWorker();
