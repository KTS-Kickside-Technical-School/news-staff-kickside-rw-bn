"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unseedUsers = unseedUsers;
const user_1 = __importDefault(require("../models/user"));
const authHelpers_1 = require("../../helpers/authHelpers");
const mongoose_1 = __importDefault(require("mongoose"));
const seedsIds_1 = require("../../types/seedsIds");
const seedUsers = async () => {
    const users = [
        {
            _id: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            firstName: "Editor",
            lastName: "one",
            email: "editor@kickside.rw",
            password: await (0, authHelpers_1.hashPassword)("password123"),
            role: "Editor",
        },
        {
            _id: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            firstName: "Journalist",
            lastName: "One",
            email: "journalist1@kickside.rw",
            password: await (0, authHelpers_1.hashPassword)("password123"),
            role: "Journalist",
        },
        {
            _id: new mongoose_1.default.Types.ObjectId(seedsIds_1.userThreeId),
            firstName: "Niyonkuru",
            lastName: "Jean",
            email: "niyonkurua97@gmail.com",
            password: await (0, authHelpers_1.hashPassword)("123"),
            role: "Admin"
        },
        {
            _id: new mongoose_1.default.Types.ObjectId(seedsIds_1.userFourId),
            firstName: "Ndahimana",
            lastName: "Bonheur",
            email: "ndahimana154@gmail.com",
            password: await (0, authHelpers_1.hashPassword)("password123"),
            role: "Admin",
        },
    ];
    await user_1.default.deleteMany({});
    await user_1.default.insertMany(users);
    console.log("Users seeded successfully.");
};
async function unseedUsers() {
    await user_1.default.deleteMany({});
    console.log("Users removed successfully.");
}
exports.default = seedUsers;
//# sourceMappingURL=users.js.map