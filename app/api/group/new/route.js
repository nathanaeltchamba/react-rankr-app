import { connectToDB } from "@utils/database";
import Group from "@models/group";
import User from "@models/user";

export const POST = async (req) => {
    const { userId, group_name } = await req.json();

    try {
        await connectToDB();

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const newGroup = new Group({
            creator: userId,
            group_name,
            members: [userId],
        });

        // Add the group to the user's groups array
        user.groups.push(newGroup._id);

        await Promise.all([newGroup.save(), user.save()]);

        console.log(newGroup);

        return new Response(JSON.stringify(newGroup), {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create a group", { status: 500 });
    }
};
