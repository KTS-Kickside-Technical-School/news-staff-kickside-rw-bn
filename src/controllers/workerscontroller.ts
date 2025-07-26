import bcrypt from 'bcrypt';
import workersRepositories from '../repository/workersRepositories';
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { createUserSchema } from '../validations/workersValidations';
import mongoose from 'mongoose';
import User from '../database/models/user';
import { decodeToken, generateToken, hashPassword } from '../helpers/authHelpers';
import { sendEmail } from '../service/emailService';


export const createUserController = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const fullNameWords = `${req.body.firstName} ${req.body.lastName}`.trim().split(/\s+/);
        req.body.username = fullNameWords.join('-').toLowerCase();

        const generatedPassword = await hashPassword("1234");
        req.body.password = generatedPassword;

        const user = await workersRepositories.createUser(req.body);

        try {
            await sendEmail(
                user.email,
                "Account created successfully",
                'Welcome to Kickside Rwanda',
                `
                <b>Welcome to Kickside Rwanda!</b>
                <p>
                We are thrilled to have you as part of our team as a <b>${req.body.role}</b>. It is a great pleasure to connect with you and witness your potential contribution to our platform.

                To get started, please log in to our platform using the following credentials:

                Email: ${user.email}
                Default Password: 1234

                For your security, we highly encourage you to change the default password upon logging in.

                If you have any questions or require assistance, feel free to reach out.
                <br/>
                Best regards,
                <br/>
                Kickside Rwanda Team
                </p>
                `
            );
        } catch (emailError) {
            console.warn("Email sending failed, but continuing:", emailError.message || emailError);
        }

        res.status(201).json({
            status: 201,
            message: 'Worker created successfully.',
            user,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



export const getAllWorkers = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const workers = await workersRepositories.findAllWorkers(req.user._id);

        return res.status(200).json({
            status: 200,
            message: "Workers Retrieved Successfully",
            data: { workers }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

export const disableUser = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        req.body.isDisabled = true;
        if (req.user.isDisabled === true) {
            return res.status(400).json({
                status: 400,
                message: "User is already disabled."
            })
        }

        const disabledUser = await workersRepositories.updateUser(req.user._id, req.body);
        await sendEmail(req.user.email, "Account disabled.", 'Your account is disabled',
            `
            <p><b>Your Kickside Account Has Been Disabled</b></p>
            <p>We regret to inform you that your Kickside account has been disabled for the following reason:</p>
            <p class="reason">${req.body.disableReason}</p>
            <p>We are honored to have you as part of our team, serving as a <b>${req.user.role}</b>. We truly appreciate the efforts you have contributed to our platform.</p>
            <p>If you believe this action was taken in error or you need further clarification, please contact our support team for assistance.</p>
            <p>We value your association with Kickside and hope to resolve any concerns promptly.</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `);
        return res.status(200).json({
            status: 200,
            message: "User Account Disabled Successfully",
            data: { disabledUser }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

export const enableUser = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        req.body.isDisabled = false

        if (req.user.isDisabled === false) {
            return res.status(400).json({
                status: 400,
                message: "User is already enabled."
            })
        }

        const enabledUser = await workersRepositories.updateUser(req.user._id, req.body);

        await sendEmail(req.user.email, "Account enabled.", 'Your account is enabled',
            `
             <p>We are delighted to inform you that your Kickside account has been re-enabled. It’s great to have you back with us!</p>
            <p>We appreciate your dedication and contribution as a valued team member in your role as <b>${req.user.role}</b>. 
            <br> We are excited to see your continued impact on our platform and community.</p>
            <p>If you have any questions or encounter any issues, feel free to contact our support team. We’re here to assist you!</p>
            <p>Once again, welcome back, and we look forward to working with you!</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `
        )


        return res.status(200).json({
            status: 200,
            message: "User Account Enabled Successfully",
            data: { enabledUser }
        });



    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}

export const updateUser = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const updatedUser = await workersRepositories.updateUser(req.user._id, req.body);
        return res.status(200).json({
            status: 200,
            mesage: "User Details Updated Successfully",
            data: { updatedUser }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.messsage
        })


    }
};

export const updateUserRole = async (req: any, res: Response): Promise<any> => {
    try {

        const updatedUser = await workersRepositories.updateUser(req.user._id, req.body);
        await sendEmail(req.user.email, "User role changed", "Your role has been updated",
            `
            <p>We would like to inform you that your role on the Kickside platform has been updated. </p>
            <p><b>Previous Role:</b> ${req.user.role}</p>
            <p><b>New Role:</b> ${req.body.role}</p>
            <p>This change reflects our confidence in your abilities and the value you bring to our team. We believe this new role will allow you to contribute even more effectively to our platform and community.</p>
            <p>If you have any questions about your new role or responsibilities, feel free to reach out to us. We’re here to support you!</p>
            <p>Best regards,</p>
            <p><b>Kickside Rwanda Team</b></p>
            `
        )
        return res.status(200).json({
            status: 200,
            message: "User Role Changed Successfully",
            data: { updatedUser }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    };
};


export const getSingleWorker = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Workers Retrieved Successfully",
            data: { worker: req.user }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};


export default {
    createUserController,
    getAllWorkers,
    disableUser,
    enableUser,
    updateUser,
    updateUserRole,
    getSingleWorker
}
