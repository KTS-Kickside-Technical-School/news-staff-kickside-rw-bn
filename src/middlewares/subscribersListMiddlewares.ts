import subscribersListRepository from "../repository/subscribersListRepository";

export const isSubscriber = async(req, res, next) =>{
    try {
        const {email}  = req.body
        const subscribers = await subscribersListRepository.findSubscriberByEmail(email)
        if(!subscribers){
            return res.status(404).json({
                status: 404,
                message: "User Not Found"
            })}
        req.subscribers = subscribers
        next()
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
}

export const isSubscriberExist = async (req, res, next) =>{
    try {
        const {email} = req.body
        const checkSubscriber = await subscribersListRepository.findSubscriberByEmail(email)
        if(checkSubscriber){
            return res.status(400).json({
                status: 400,
                message: "You have arleady subscribed to our newsletter, Thank you!"
            })
        }
        next()
    } catch (error) {
        res.status(500).jon({
            status: 500,
            message: error.message
        })
        
    }
}

export default {
    isSubscriber,
    isSubscriberExist
}