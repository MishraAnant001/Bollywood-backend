import { ApiError, ErrorCodes } from "@utils";
import { NextFunction, Request, Response } from "express";
import config from "config"
import jwt from "jsonwebtoken"
import { newRequest } from "@interfaces";


export class Authentication {

    authenticateActor(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, config.get("SECRET_KEY"))

            if (decode.role != "actor") {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access only actors are allowed")
            } else {
                req.userid = decode.userid;
                req.role = decode.role
                next()
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }
    authenticateUser(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, config.get("SECRET_KEY"))

            if (decode.role != "user") {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access only users are allowed")
            } else {
                req.userid = decode.userid;
                req.role = decode.role
                next()
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }

    authenticateDirector(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, config.get("SECRET_KEY"))

            if (decode.role != "director") {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access only directors are allowed")
            } else {
                req.userid = decode.userid;
                req.role = decode.role
                next()
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }

    authenticateProducer(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, config.get("SECRET_KEY"))

            if (decode.role != "producer") {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access only producers are allowed")
            } else {
                req.userid = decode.userid;
                req.role = decode.role
                next()
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }
    authenticateAll(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, config.get("SECRET_KEY"))
                req.userid = decode.userid;
                req.role = decode.role
                next()
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }
    
    authenticateAdmin(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies;
            if (!token) {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access!")
            }
            const decode: any = jwt.verify(token, "anantmanojmishra")

            if (decode.role != "admin") {
                throw new ApiError(ErrorCodes.unauthorized, "Unauthorized access only admins are allowed")
            } else {
                req.userid = decode.userid;
                req.role = decode.role
                next()
            }
        } catch (error: any) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            } else {
                res.status(ErrorCodes.internalServerError).json({
                    success: false,
                    message: `Error while authentication : ${error.message}`
                })
            }
        }
    }
}