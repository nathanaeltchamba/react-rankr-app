import { connectToDB } from "@utils/database";
import Group from "@models/group";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { groupName, groupCode, userId } = await req.json();
        const group = await Group.findOne({ group_name: groupName });

        if (!group) {
            return new Response("Group not found", { status: 404 });
        }

        // Check if the provided group code matches
        if (group.code !== groupCode) {
            return new Response("Invalid group code", { status: 400 });
        }

        // Check if user is already a member of the group
        if (group.members.includes(userId)) {
            return new Response("You are already a member of this group", { status: 400 });
        }

        group.members.push(userId);
        await group.save();

        return new Response(JSON.stringify(group), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to join the group", { status: 500 });
    }
};
