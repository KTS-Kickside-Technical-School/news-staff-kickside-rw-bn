import { Request, Response, NextFunction } from "express";
import { sendEmail } from "../service/emailService";
import subscribersListRepository from "../repository/subscribersListRepository";
import jwt from 'jsonwebtoken'

const subscribeUserController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email } = req.body;

    const subscriber = await subscribersListRepository.saveSubscibers({ email });

    const token = jwt.sign(
      { email: subscriber.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const unsubscribeLink = `${process.env.CLIENT_URL}email=${subscriber.email}/unsubscriber?token=${token}`;

    try {
      await sendEmail(
        email,
        "User Subscription",
        "Subscription Confirmed",
        `<p>Dear <b>${subscriber.email}</b>,</p>
        <p>Thank you for subscribing to Kickside Rwanda! You are now part of our community and will receive updates, news, and exclusive offers from us.</p>
        <p>If you ever wish to unsubscribe, you can do so anytime by clicking the link below:</p>
        <p><a href="${unsubscribeLink}" style="color: #d9534f; font-weight: bold;">Unsubscribe</a></p>
        <br>
        <p>Best regards,</p>
        <p><b>Kickside Rwanda Team</b></p>`
      );
    } catch (emailError) {
      console.error("❌ Failed to send subscription email:", emailError);
    }

    return res.status(201).json({
      status: 201,
      message: 'Subscription created successfully (email send attempt logged)'
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || 'Internal server error'
    });
  }
};

const unsubscribeUserController = async (req: any, res: Response): Promise<any> => {
    try {
        const { token } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { email } = decoded
        let unsubscriber = await subscribersListRepository.unsubscriber(email);
        await sendEmail(email,
            "User unsubscription",
            "Unsubscription Confirmed",
            `<p>Dear <b>${unsubscriber.email}</b>,</p>
            <p>You have successfully unsubscribed from our system. You will no longer receive updates from us.</p>
            <p>If you change your mind, you can resubscribe anytime by:</p>
            <p>Subscribing Again</a></p>
            <br>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>`

        )
        res.status(200).json({
            status: 200,
            message: "User Unsubscription Successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}

const getSubscriptionListController = async (req: any, res: Response): Promise<any> => {
    try {
        const subscribers = await subscribersListRepository.getSubscribersList();
        return res.status(200).json({
            status: 200,
            data: { subscribers }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export default {
    subscribeUserController,
    unsubscribeUserController,
    getSubscriptionListController
}