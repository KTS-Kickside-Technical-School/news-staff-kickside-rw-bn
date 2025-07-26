import User from "../database/models/user";

const findWorkerByAttribute = async (key: any, value: any) => {
    return User.findOne({ [key]: value })
}

const createUser = async (userData: any) => {
    return await User.create(userData);
}

const findAllWorkers = async (excludeId: string, filter: object = {}, sort: string = 'createdAt') => {
    const finalFilter = { ...filter, _id: { $ne: excludeId } };

    const workers = await User.find(finalFilter, '-password').sort(sort);
    return workers;
};


const updateUser = async (id: any, data: any) => {
    return await User.findByIdAndUpdate(id, data, { new: true })
};

const getUserById = async (id: any) => {
    return await User.findById(id)
}

export default {
    findWorkerByAttribute,
    createUser,
    findAllWorkers,
    updateUser,
    getUserById
}