import mongoose from "mongoose";
import Article from "../models/article";
import { userOneId, userTwoId } from "../../types/seedsIds";
import { generateSlug } from "../../helpers/articleHelpers";

const seedArticles = async () => {
    const articles = [
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Ikoranabuhanga",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("1")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Ikoranabuhanga",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("2")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Imikino",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("3")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Imyidagaduro",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("4")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Ikoranabuhanga",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("5")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Ikoranabuhanga",
            language: "kinyarwanda",
            status: "published",
            slug: generateSlug("6")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            language: "english",
            status: "published",
            slug: generateSlug("7")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            language: "english",
            status: "published",
            slug: generateSlug("8")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Technology",
            language: "english",
            status: "published",
            slug: generateSlug("9")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            language: "english",
            status: "published",
            slug: generateSlug("10")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Sports",
            language: "english",

            slug: generateSlug("11")
        },
        {
            title: "Apple 16-inch MacBook Pro (M4 Pro) review: A powerful desktop replacement",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            author: new mongoose.Types.ObjectId(userOneId),
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999717/wipwtaifiqnxgtlfdptt.webp",
            category: "Technology",
            language: "english",
            status: "published",
            slug: generateSlug("12")
        },
        {
            title: "SocialCrowd raises $2.5M seed round as interest in future of work software remains",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus. Sed sed tellus et arcu facilisis consectetur. Integer vel neque at neque viverra elementum. Sed non neque elit. Sed ut lectus vitae dolor convallis faucibus.",
            coverImage: "https://res.cloudinary.com/dpu6ljn5c/image/upload/v1730999913/ickqupcpil7kpz0np1zc.webp",
            author: new mongoose.Types.ObjectId(userTwoId),
            category: "Entertainment",
            language: "english",
            status: "published",
            slug: generateSlug("13")
        }
    ]

    // await Article.deleteMany({})
    await Article.insertMany(articles)
    console.log("Seeding articles completed")
}

export const unseedArticles = async () => {
    await Article.deleteMany({})
    console.log("Unseeding articles completed")
}

export default seedArticles;