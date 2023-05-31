import { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question_text: {
        type: String,
        required: true
    }
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
