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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function insertUser(email, firstName, lastName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const res = yield prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                },
            });
            console.log("User created successfully");
            console.log(res);
        }
        catch (error) {
            console.error("Error creating user:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function updateUser(email_1, _a) {
    return __awaiter(this, arguments, void 0, function* (email, { firstName, lastName }) {
        try {
            const update = yield prisma.user.update({
                where: { email: email },
                data: { firstName, lastName },
                select: { firstName: true, lastName: true },
            });
            console.log("User updated successfully");
            console.log(update);
        }
        catch (error) {
            console.error("Error Updating user:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// updateUser("maaa@gmail.com", { firstName: "Ram", lastName: "Kaku" });
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { email },
                select: { id: true, email: true, firstName: true, lastName: true },
            });
            console.log("User found successfully");
            console.log(user);
        }
        catch (error) {
            console.log("Error getting user:", error);
        }
    });
}
getUser("maaa@gmail.com");
