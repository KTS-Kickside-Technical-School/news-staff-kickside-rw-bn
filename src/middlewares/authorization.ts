import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../helpers/authHelpers";
import authRepositories from "../repository/authRepositories";

export const userAuthorization = function (roles: string[]) {
    return async (req: any, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }

            const decoded: any = await decodeToken(token);
            const session = await authRepositories.findSessionByUserIdAndToken(
                decoded._id, token
            );
            if (!session) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }

            const user = await authRepositories.findUserByAttribute("_id", decoded._id);
            if (!user) {
                return res
                    .status(401)
                    .json({ status: 401, message: "Not authorized" });
            }
            if (!roles.includes(user.role)) {
                return res.status(401).json({
                    status: 401, message: "Not authorized"
                })
            }
            req.user = user;
            req.session = session;
            next();
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    };
};