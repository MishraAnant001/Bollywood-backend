import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: {
            values: ["Action",
                "Adventure",
                "Animation",
                "Biography",
                "Comedy",
                "Crime",
                "Documentary",
                "Drama",
                "Family",
                "Fantasy",
                "Film-Noir",
                "History",
                "Horror",
                "Music",
                "Musical",
                "Mystery",
                "Romance",
                "Sci-Fi",
                "Short",
                "Sport",
                "Thriller",
                "War",
                "Western"],
            message: "{VALUE} is not a valid genre"
        },
        required: true,
    }
})

export const Genre = mongoose.model("Genre",genreSchema)