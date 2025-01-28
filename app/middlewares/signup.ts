
import { NextFunction, Request, Response } from "express";
import { signupValidate } from "../../utils/validation/validator";


const validate  = async (req: Request, res: Response, next:NextFunction) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const user = {username, email, password, role};
        try {
            const temp = await signupValidate.parseAsync(user);
            next();
        } catch (error) {
            res.status(400).json({ error: "Invalid input data or format" });
        }
}
export default validate;