import SubscriberList from "../database/models/subscribersList";

const saveSubscibers = async (data: any) => {
    return await SubscriberList.create(data)
}
const findSubscriberByEmail = async (email) => {
    return await SubscriberList.findOne({ email })
};

const unsubscriber = async (email) => {
    return await SubscriberList.findOneAndDelete({ email })
}

const getSubscribersList = async () => {
    return await SubscriberList.find({}).sort({ createdAt: -1 })
}

export default {
    saveSubscibers,
    findSubscriberByEmail,
    unsubscriber,
    getSubscribersList
}