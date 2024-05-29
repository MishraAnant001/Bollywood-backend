import { Router } from "express";
import { UserController } from "@controllers";
import { Authentication } from "@middlewares";
const auth = new Authentication()
const controller= new UserController()
export const userRouter = Router()


userRouter.route("/?").get(auth.authenticateAdmin,controller.getAllUsers)
userRouter.route("/").post(auth.authenticateAdmin,controller.createUser)
userRouter.route("/:id").get(auth.authenticateAdmin,controller.getUserbyId).put(auth.authenticateAdmin,controller.updateUser).delete(auth.authenticateAdmin,controller.deleteUser)
userRouter.post("/forgotpassword",controller.forgotPassword)
userRouter.post("/verifyotp",controller.verifyOtp)
userRouter.post("/setpassword",controller.setPassword)
