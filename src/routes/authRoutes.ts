import express from 'express';
import { isUserExists } from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/bodyValidation';
import { forgotPasswordSchema, resetPasswordSchema, userLoginSchema, updateProfileSchema, changePasswordSchema } from '../validations/authValidations';
import authControllers from '../controllers/authControllers';
import { userAuthorization } from '../middlewares/authorization';


const authRoute = express.Router();

authRoute.post("/login", bodyValidation(userLoginSchema), isUserExists, authControllers.userLogin);

authRoute.post("/forgot-password", bodyValidation(forgotPasswordSchema), isUserExists, authControllers.forgotPassword)
authRoute.post("/reset-password", bodyValidation(resetPasswordSchema), authControllers.resetPassword)

authRoute.post("/logout", userAuthorization(["Admin", "Journalist", "Editor"]), authControllers.userLogout)

authRoute.get("/get-profile", userAuthorization(["Admin", "Journalist", "Editor"]), authControllers.getUserProfile);
authRoute.put("/update-profile", userAuthorization(["Admin", "Editor", "Journalist"]), authControllers.updateUserProfile)

authRoute.put("/change-password", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(changePasswordSchema), authControllers.changePassword);

export default authRoute;   