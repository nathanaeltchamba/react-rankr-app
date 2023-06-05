import { Schema, models, model } from "mongoose";

const AnswerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer_text: {
        type: String,
        required: true
    },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
