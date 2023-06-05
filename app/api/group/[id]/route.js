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

        // Find the existing Group by ID
        const existingGroup = await Group.findById(params.id);

        if (!existingGroup) {
            return new Response("Group not found", { status: 404 });
        }

        // Update the prompt with new data
        existingGroup.group_name = group_name;

        await existingGroup.save();

        return new Response("Successfully updated the Group", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
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