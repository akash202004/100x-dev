"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "kafka",
    brokers: ["localhost:9092"],
});
const producer = kafka.producer();
const consumer = kafka.consumer({
    groupId: "kafka",
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        yield consumer.connect();
        yield producer.send({
            topic: "quickstart-events",
            messages: [
                {
                    value: "hello world",
                },
            ],
        });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: "quickstart-events",
            fromBeginning: true,
        });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                console.log({
                    offset: message.offset,
                    value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
            }),
        });
    });
}
main();
