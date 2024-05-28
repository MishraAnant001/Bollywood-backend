import { Router } from "express";
import { UserController } from "@controllers";
import { Authentication } from "@middlewares";
const auth = new Authentication()
const controller= new UserController()
export const userRouter = Router()

userRouter.use(auth.authenticateAdmin)
userRouter.route("/?").get(controller.getAllUsers).post(controller.createUser)
userRouter.route("/:id").get(controller.getUserbyId).put(controller.updateUser).delete(controller.deleteUser)