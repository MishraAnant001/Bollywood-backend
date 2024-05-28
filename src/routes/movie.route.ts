import { Router } from "express";
import { MovieController } from "@controllers";
import { Authentication } from "@middlewares";
const auth = new Authentication()
const controller= new MovieController()
export const movieRouter = Router()

movieRouter.route("/?").get(auth.authenticateAll,controller.getAllMovies).post(auth.authenticateAdmin,controller.createMovie)
movieRouter.route("/:id").get(controller.getMovieById).put(auth.authenticateAdmin,controller.updateMovie).delete(auth.authenticateAdmin,controller.deleteMovie)
movieRouter.route("/getpdf/pdf/?").get(auth.authenticateAll,controller.getAllMoviesPDF)