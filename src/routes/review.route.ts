import { ReviewController } from "@controllers";
import { Router } from "express";
import { Authentication } from "@middlewares";
const auth = new Authentication()
export const reviewRouter = Router()
const controller = new ReviewController()

reviewRouter.route("/:id").get(controller.getAllReviews).post(auth.authenticateUser,controller.createReview)