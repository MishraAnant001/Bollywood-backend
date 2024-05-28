import { GenreController } from "@controllers";
import { Router } from "express";
const controller = new GenreController()
export const genreRouter = Router()

genreRouter.get("/",controller.getAllGenres)