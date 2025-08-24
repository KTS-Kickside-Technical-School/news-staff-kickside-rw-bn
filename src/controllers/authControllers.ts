import { Response } from "express";
import { comparePassword, decodeToken, destroyToken, generateToken, hashPassword } from "../helpers/authHelpers";
import authRepositories from "../repository/authRepositories";
import { sendEmail } from "../service/emailService";
import user from "../database/models/user";
import jwt from 'jsonwebtoken'
import User from "../database/models/user";
import bcrypt from 'bcrypt'

const userLogin = async (req: any, res: Response): Promise<any> => {
    try {
        const isPasswordMatch = await comparePassword(req.body.password, req.user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Email or Password is not correct.",
            })
        }

        if (req.user.isDisabled === true) {
            return res.status(401).json({
                status: 401,
                message: "Your account has been disabled. Please contact the administrator."
            })
        }

        const token = await generateToken(req.user._id);
        const session = await authRepositories.saveSession({
            user: req.user._id,
            content: token
        });

        const device = req.headers["user-agent"] || "Unknown Devices";
        const ip = req.ip || req.connection.remoteAddress;

        // await sendEmail(req.user.email, 'New Login Detected - Kickside Rw',
        //     'New Account Login',
        //     `<p>New login was detected to you account on <b>${device}</b> with this IP address: <b>${ip}</b>, if this was not you try reseting password.</p>`
        // );


        return res.status(200).json({
            status: 200,
            message: "Login successful",
            user: req.user,
            session
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        })
    }
};

const forgotPassword = async (req: any, res: Response): Promise<any> => {
    try {
        const { email } = req.body

        const resetToken = await generateToken(req.user._id);
        const session = await authRepositories.saveSession({ user: req.user._id, content: resetToken });
        const reseLink = `${process.env.CLIENT_URL}/staff/reset-password?token=${resetToken}`
        await sendEmail(email, "Password reset requested", 'Password Reset Process',
            `<p>You have request to reset your password,
             click  <a href="${reseLink}">here</a> to reset your password. This link expires in 1 hour.</p>
            <br/>
            Best regards,
            <br/>
           <b> Kickside Rwanda Team</b>
            </p>`
        )

        return res.status(200).json({
            status: 200,
            message: "Password reset email sent successfully",
            data: { session }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.messsage
        })
    }
};

const resetPassword = async (req: any, res: Response): Promise<any> => {
    try {
        const { token, password } = req.body
        const decoded: any = decodeToken(token);

        if (!decoded || !decoded._id) {
            return res.status(400).json({
                status: 400,
                message: "Invalid or expired token"
            });
        }

        const user = await authRepositories.findUserByAttribute("_id", decoded._id)
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid token  or user not found"
            })
        };

        const session = await authRepositories.findSessionByUserIdAndToken(user._id, token);

        if (!session) {
            return res.status(400).json({ status: 400, message: "Token expired or invalid" });
        }

        await authRepositories.deleteSession(session._id);

        const hashedPassword = await bcrypt.hash(password, 10)

        await authRepositories.updateUser(user._id, { password: hashedPassword });

        return res.status(200).json({
            status: 200,
            message: "Password reset successsfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    };
};

const userLogout = async (req: any, res: Response): Promise<any> => {
    try {
        await destroyToken(req.session.content);

        await authRepositories.deleteSession(req.session._id);

        return res.status(200).json({
            status: 200,
            message: "Logout successful"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        })
    }
};

export const getUserProfile = async (req: any, res: Response): Promise<any> => {
    try {
        const user = req.user;

        return res.status(200).json({
            status: 200,
            message: "User Profile Fetched Successfully",
            data: { user }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })

    }
};

export const updateUserProfile = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id

        const updatedProfile = await authRepositories.updateUser(userId, req.body);
        return res.status(200).json({
            status: 200,
            message: "User profile updated successfully",
            data: { updatedProfile }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}

const changePassword = async (req: any, res: Response): Promise<any> => {
    try {
        const userId = req.user._id

        const isPasswordMatch = await comparePassword(req.body.password, req.user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Currnet password is not correct.",
            })
        }
        const newPassword = await hashPassword(req.body.newPassword);

        const user = await authRepositories.updateUser(userId, { password: newPassword });

        return res.status(200).json({
            status: 200,
            message: "Password changed successfully",
            data: { user }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message

        })
    }
}

export default {
    userLogin,
    forgotPassword,
    resetPassword,
    userLogout,
    getUserProfile,
    updateUserProfile,
    changePassword
}