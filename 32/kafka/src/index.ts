import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: "kafka",
});

async function main() {
  await producer.connect();
  await consumer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [
      {
        value: "hello world",
      },
    ],
  });
  await consumer.connect();
  await consumer.subscribe({
    topic: "quickstart-events",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
      });
    },
  });
}

main();
