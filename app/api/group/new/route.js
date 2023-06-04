import { connectToDB } from "@utils/database";
import Group from "@models/group";

export const POST = async (req) => {
    const { userId, group_name } = await req.json()

    try {
        await connectToDB();
        const newGroup = new Group ({ 
            creator: userId, group_name,
            members: [userId]
        })

        await newGroup.save();
        console.log(newGroup);
        return new Response(JSON.stringify(newGroup), {
            status:201
        })
    } catch (error) {
        return new Response("Failed to create a group", { status: 500 })
    }
}

