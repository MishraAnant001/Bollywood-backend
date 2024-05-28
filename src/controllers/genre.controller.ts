import { GenreService } from "@services";
import { Request, Response } from "express";
const service= new GenreService()
export class GenreController{
    async getAllGenres(req:Request,res:Response) {
        try {
            const data = await service.getAllGenre();
            return res.status(data.statusCode).json(data)
        } catch (error:any) {
            return res.json({
                success:false,
                message:`error while getting genres : ${error.message}`
            })
        }
    }
}