import Article from "../database/models/article"
import Session from "../database/models/session"
import User from "../database/models/user"

const findUserByAttribute = async (key: any, value: String) => {
    return await User.findOne({ [key]: value }).select("+password")
}

const saveSession = async (data: any) => {
    return await Session.create(data);
}

const findSessionByUserIdAndToken = async (user: any, content: any) => {
    return await Session.findOne({ user, content })
}

const updateUser = async (userId: any, updateData: any) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true })
}

const deleteSession = async (sessionId: any) => {
    return await Session.findByIdAndDelete(sessionId)
};

const getUserById = async (id: any) => {
    return await User.findById(id)
};

const findUserByUsernames = async (username) => {
    return await User.findOne(
        {
            username,
            isDisabled: false
        });
};

const findArticlesByAuthor = async (authorId) => {
    return await Article.find({ author: authorId, status: "published" })
        .sort({ createdAt: -1 });
};

const findRelatedJournalists = async (currentUserId) => {
    return await User.find({ _id: { $ne: currentUserId }, isDisabled: false })
        .select("firstName lastName bio username profile")
        .limit(5)
};


export default {
    findUserByAttribute,
    saveSession,
    findSessionByUserIdAndToken,
    updateUser,
    deleteSession,
    getUserById,
    findUserByUsernames,
    findArticlesByAuthor,
    findRelatedJournalists
}