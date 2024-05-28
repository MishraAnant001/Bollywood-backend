import { Router } from "express";
import { LoginController } from "@controllers";
const controller= new LoginController()
export const loginRouter = Router()

loginRouter.route("/").post(controller.loginUser)
