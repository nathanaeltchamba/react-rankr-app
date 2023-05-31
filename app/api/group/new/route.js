import { connectToDB } from "@utils/database";
import Group from "@models/group";

export const POST = async (req) => {
    const {userId, name } = await req.json()

    try {
        await connectToDB();
        const newGroup = new Group ({ 
            creator: userId, name 
        })

        await newGroup.save();

        return new Response(JSON.stringify(newGroup), {
            status:201
        })
    } catch (error) {
        return new Response("Failed to fetch all groups", { status: 500 })
    }

}