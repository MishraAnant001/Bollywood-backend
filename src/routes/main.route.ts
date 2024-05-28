import { Router } from "express";
import { loginRouter } from "./login.route";
import { signupRouter } from "./signup.route";
import { userRouter } from "./user.route";
import { genreRouter } from "./genre.route";
import { movieRouter } from "./movie.route";
import { reviewRouter } from "./review.route";
// import { userRouter,signupRouter, loginRouter } from "@routes";
export const mainRouter = Router()

mainRouter.use("/api/v1/users",userRouter)
mainRouter.use("/api/v1/signup",signupRouter)
mainRouter.use("/api/v1/login",loginRouter)
mainRouter.use("/api/v1/genre",genreRouter)
mainRouter.use("/api/v1/movie",movieRouter)
mainRouter.use("/api/v1/review",reviewRouter)