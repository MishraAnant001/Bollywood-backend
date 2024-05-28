import { Router } from "express";
import { SignupController } from "@controllers";
const controller= new SignupController()
export const signupRouter = Router()

signupRouter.route("/").post(controller.signupUser)
