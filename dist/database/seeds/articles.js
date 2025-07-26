"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unseedArticles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const article_1 = __importDefault(require("../models/article"));
const seedsIds_1 = require("../../types/seedsIds");
const seedArticles = async () => {
    const articles = [
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 1
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 2
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 3
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 4
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 5
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 6
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 7
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 8
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 9
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 10
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 11
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Tech",
            slug: 12
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose_1.default.Types.ObjectId(seedsIds_1.userTwoId),
            category: "Tech",
            slug: 13
        }
    ];
    await article_1.default.deleteMany({});
    await article_1.default.insertMany(articles);
    console.log("Seeding articles completed");
};
const unseedArticles = async () => {
    await article_1.default.deleteMany({});
    console.log("Unseeding articles completed");
};
exports.unseedArticles = unseedArticles;
exports.default = seedArticles;
//# sourceMappingURL=articles.js.map