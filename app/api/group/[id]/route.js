import Group from "@models/group";
import { connectToDB } from "@utils/database";

export const GET = async ( request, { params } ) => {
    try {
        await connectToDB();

        const group = await Group.findById(params.id).populate("creator")
        if (!group) return new Response("Group Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { name } = await request.json();

    try {
        await connectToDB();

        // Find the existing Group by ID
        const existingGroup = await Group.findById(params.id);

        if (!existingGroup) {
            return new Response("Group not found", { status: 404 });
        }

        // Update the Group with new data
        existingGroup.name = name;

        await existingGroup.save();

        return new Response("Successfully updated the Group Name", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Group Name", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Group.findByIdAndRemove(params.id);

        return new Response("Group deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Group", { status: 500 });
    }
};