import Group from "@models/group";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const groups = await Group.find({}).populate('creator')

        return new Response(JSON.stringify(groups), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Groups", { status: 500 })
    }
} 