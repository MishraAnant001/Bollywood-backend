import { Genre } from "@models";
import { ApiResponse } from "../utils/apiresponse";
import { SuccessCodes } from "../utils/Status_Code";
export class GenreService{
    async getAllGenre(){
        const data = await Genre.find({})
        return new ApiResponse(SuccessCodes.ok,data,"genre fetched successfully")
    }
}

