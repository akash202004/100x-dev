import { DefaultService } from "./generated";

async function start() {
  const res = await DefaultService.getUser("939");
  console.log(res);
}

start();
