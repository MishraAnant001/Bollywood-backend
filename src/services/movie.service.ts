import { Movie, User } from "@models";
import { IMovie } from "@interfaces";
import { ApiResponse } from "../utils/apiresponse";
import { ErrorCodes, SuccessCodes } from "../utils/Status_Code";
import { ApiError } from "../utils/apierror";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { dynamicSearchandFilter, dynamicSort } from "../utils/dynamicquerybuilder";
export class MovieService {
    async getAllMovies(userid: string, role: string,filters:ParsedQs) {
        const{sort,search,maxBudget,minBudget,maxCollection,minCollection,genre,minDate,maxDate}=filters
        let username = null;
        if (role!="user" && role!="admin") {
            const user = await User.findOne({ _id: userid })
            if (user) {
                username = user.name;
            }
        }
        const page = Number(filters.page) || 1
        const limit = Number(filters.limit) || 5
        const skip = (page-1) * limit
        const data = await Movie.aggregate([
            {
                $lookup: {
                    from: "genres",
                    localField: "genre",
                    foreignField: "_id",
                    as: "genreinfo"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "cast",
                    foreignField: "_id",
                    as: "castinfo"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "producer",
                    foreignField: "_id",
                    as: "producerinfo"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "director",
                    foreignField: "_id",
                    as: "directorinfo"
                }
            },
            {
                $addFields: {
                    success_level: {
                        $switch: {
                            branches: [
                                {
                                    case: { $gt: [{ $divide: ["$collections", "$budget"] }, 3] },
                                    then: "Blockbuster"
                                },
                                {
                                    case: { $gt: [{ $divide: ["$collections", "$budget"] }, 2] },
                                    then: "Superhit"
                                },
                                {
                                    case: { $gt: [{ $divide: ["$collections", "$budget"] }, 1] },
                                    then: "Hit"
                                },
                                {
                                    case: { $lt: [{ $divide: ["$collections", "$budget"] }, 1] },
                                    then: "Flop"
                                }
                            ],
                            default: "Unknown"
                        }
                    }
                }
            },
            {
                $project: {
                    title: 1,
                    genre: {
                        $map: {
                            input: "$genreinfo",
                            as: "genre",
                            in: "$$genre.name"
                        }
                    },
                    cast: {
                        $map: {
                            input: "$castinfo",
                            as: "cast",
                            in: "$$cast.name"
                        }
                    },
                    producer: {
                        $map: {
                            input: "$producerinfo",
                            as: "producer",
                            in: "$$producer.name"
                        }
                    },
                    director: {
                        $first: ["$directorinfo.name"]
                    },
                    budget: 1,
                    collections: 1,
                    release_date: 1,
                    success_level: 1,
                    releaseDate:1
                }
            },
            {
                $sort:dynamicSort(sort as string)
            },
            {
                $match: dynamicSearchandFilter(["title","director","producer","cast"],search as string,maxBudget,minBudget,maxCollection,minCollection,genre,username as string,role,minDate as string,maxDate as string)
            },
            {
                $skip:skip
            },{
                $limit:limit
            }
        ])
        // console.log(object)
        // console.log(matchObject)
        // const data = await Movie.find({})
        if(data.length==0){
            throw new ApiError(ErrorCodes.notFound, "No such movie exists!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Movies fetched successfully")
    }
    async createMovie(moviedata: IMovie) {
        const data = await Movie.create(moviedata)
        return new ApiResponse(SuccessCodes.ok, data, "Movie added successfully")
    }
    async updateMovie(id: string, moviedata: IMovie) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid movie id!")
        }
        const data = await Movie.findByIdAndUpdate(id, moviedata)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No such movie exists!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Movie updated successfully")
    }
    async getMovieById(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid movie id!")
        }
        const data = await Movie.findById(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No such movie exists!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Movie fetched successfully")
    }
    async deleteMovie(id: string) {
        if (!mongoose.isValidObjectId(id)) {
            throw new ApiError(ErrorCodes.badRequest, "Please provide valid movie id!")
        }
        const data = await Movie.findByIdAndDelete(id)
        if (!data) {
            throw new ApiError(ErrorCodes.notFound, "No such movie exists!")
        }
        return new ApiResponse(SuccessCodes.ok, data, "Movie deleted successfully")
    }
}