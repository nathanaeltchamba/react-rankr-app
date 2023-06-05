import Group from "@models/group";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const group = await Group.findById(params.id).populate("creator")
        if (!group) return new Response("Group Not Found", { status: 404 });

        return new Response(JSON.stringify(group), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}


export const PATCH = async (request, { params }) => {
    const { group_name } = await request.json();

    try {
        await connectToDB();

        const existingGroup = await Group.findById(params.id);

        if (!existingGroup) {
            return new Response("Group not found", { status: 404 });
        }

        const groupWithSameName = await Group.findOne({ group_name });
        if (groupWithSameName && groupWithSameName._id.toString() !== existingGroup._id.toString()) {
            return new Response("Group name already exists", { status: 400 });
        }

        existingGroup.group_name = group_name;

        await existingGroup.save();

        return new Response("Successfully updated the Group", { status: 200 });
    } catch (error) {
        return new Response("Error updating the Group", { status: 500 });
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the group by ID and remove it
        await Group.findByIdAndRemove(params.id);

        return new Response("Group deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting group", { status: 500 });
    }
};