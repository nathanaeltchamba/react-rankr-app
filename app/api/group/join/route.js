// api/group/join.js
import { connectToDB } from "@utils/database";
import Group from "@models/group";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { groupName } = await req.json();
        const group = await Group.findOne({ group_name: groupName });

        if (!group) {
            return new Response("Group not found", { status: 404 });
        }

        // Check if user is already a member of the group
        if (group.members.includes(req.session.userId)) {
            return new Response("You are already a member of this group", { status: 400 });
        }

        group.members.push(req.session.userId);
        await group.save();

        return new Response(JSON.stringify(group), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to join the group", { status: 500 });
    }
};
