import { connectToDB } from "@utils/database";
import Group from "@models/group";
import User from "@models/user";

export const POST = async (request) => {
    try {

        await connectToDB();

        const { userId, groupId } = await request.json();
        const user = await User.findById(userId);

        const group = await Group.findById(groupId);

        if (!user || !group) {
            return new Response("User or group not found", { status: 404 });
        }

        group.members.push(user);
        user.groups.push(group);

        await group.save();
        await user.save();

        return new Response(JSON.stringify(group), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to join the group", { status: 500 });
    }
};
