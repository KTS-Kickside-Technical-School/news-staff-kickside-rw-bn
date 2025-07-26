import mongoose from "mongoose";
import Article from "../models/article";
import { userOneId, userTwoId } from "../../types/seedsIds";

const seedArticles = async () => {
    const articles = [
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 1
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 2
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 3
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 4
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 5
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 6
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 7
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 8
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 9
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 10
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 11
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            slug: 12
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            slug: 13
        }
    ]

    await Article.deleteMany({})
    await Article.insertMany(articles)
    console.log("Seeding articles completed")
}

export const unseedArticles = async () => {
    await Article.deleteMany({})
    console.log("Unseeding articles completed")
}

export default seedArticles;