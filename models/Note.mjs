import mongoose from "mongoose";
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title_note: {
        type: String,
        required: true
    },
    tag_note: {
        type: String,
        required: true
    },
    content_note: {
        type: String,
        required: true
    },
    creationDate_note: {
        type: Date,
        required: true,
        default: Date.now()
    },
    finishDate_note: {
        type: Date,
        required: true
    },
    status_note: {
        type: String,
        required: true,
        default: "Open"
    },
    creator_note: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

export const Note = mongoose.model("notes", NoteSchema)