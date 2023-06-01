import { Schema, models, model } from "mongoose";


const GroupSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    group_name: {
        type: String,
        required: [true, 'Group name is required!'],
        unique: [true, 'Group name already exists'],
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

const Group = models.Group || model("Group", GroupSchema);

export default Group;
