import { MovieService } from "@services"
import { Request, Response } from "express"
import { ApiError, ErrorCodes, generatePDF } from "@utils";
import { IMovie, newRequest } from "@interfaces";
const service = new MovieService()
export class MovieController {
    async getAllMovies(req: newRequest, res: Response): Promise<any> {
        try {
            const { userid, role } = req
            const filters = req.query
            if (userid && role) {
                const response = await service.getAllMovies(userid, role, filters);
                res.status(response.statusCode).json(response)
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                return res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while getting all movies : ${error.message}`
                })
            }
        }
    }
    async getAllMoviesPDF(req: newRequest, res: Response): Promise<any> {
        try {
            const { userid, role } = req
            const filters = req.query
            if (userid && role) {
                const response = await service.getAllMovies(userid, role, filters);
                await generatePDF(response.data)
                res.contentType("application/pdf");
                res.sendFile("movies.pdf", { root: `${process.cwd()}/src/Output` }, (err) => {
                    if (err) {
                        console.error("Error sending file:", err);
                        res.status(500).send("Error sending PDF");
                    } else {
                        console.log("PDF sent successfully");
                    }
                });
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                return res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while getting all movies : ${error.message}`
                })
            }
        }
    }
    async getMovieById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const response = await service.getMovieById(id)
            return res.status(response.statusCode).json(response)
        } catch (error: any) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                return res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while getting the movie : ${error.message}`
                })
            }
        }
    }
    async createMovie(req: Request, res: Response): Promise<Response> {
        try {
            const moviedata: IMovie = req.body;
            const response = await service.createMovie(moviedata)
            return res.status(response.statusCode).json(response)
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while adding the movie : ${error.message}`
            })
        }
    }
    async updateMovie(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const moviedata: IMovie = req.body;
            const response = await service.updateMovie(id, moviedata)
            return res.status(response.statusCode).json(response)
        } catch (error: any) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                return res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while updating the movie : ${error.message}`
                })
            }
        }
    }
    async deleteMovie(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const response = await service.deleteMovie(id)
            return res.status(response.statusCode).json(response)
        } catch (error: any) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                return res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while deleting the movie : ${error.message}`
                })
            }
        }
    }

}