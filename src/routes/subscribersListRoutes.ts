import express from 'express'
import bodyValidation from '../middlewares/bodyValidation'
import { subscribersSchema, unsubscriberSchema } from '../validations/subscribersListValidation'
import subscribersListController from '../controllers/subscribersListController'
import { isSubscriber, isSubscriberExist } from '../middlewares/subscribersListMiddlewares'

const subscribersRoute = express.Router()

subscribersRoute.post("/user-subcription", bodyValidation(subscribersSchema), isSubscriberExist, subscribersListController.subscribeUserController)
subscribersRoute.get("/user-unsubcription", bodyValidation(unsubscriberSchema), isSubscriber, subscribersListController.unsubscribeUserController)

subscribersRoute.get("/get-subscription-list",  subscribersListController.getSubscriptionListController)

export default subscribersRoute