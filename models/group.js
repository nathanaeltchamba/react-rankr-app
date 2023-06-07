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
    code: {
        type: String,
        unique: [true, 'Group code already exists'],
        default: generateCode,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

GroupSchema.pre('save', function (next) {
    if (!this.code) {
        this.code = generateCode();
    }
    next();
});

const Group = models.Group || model("Group", GroupSchema);

function generateCode() {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 5;

    for (let i = 0; i < codeLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

export default Group;
