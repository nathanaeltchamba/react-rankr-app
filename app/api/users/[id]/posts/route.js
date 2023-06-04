import Group from "@models/group";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const groups = await Group.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(groups), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch Groups created by user", { status: 500 })
    }
} 