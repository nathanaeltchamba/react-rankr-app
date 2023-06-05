import User from "@models/user";

export const POST = async (req) => {
    const { userIds } = await req.json();

    try {
        const users = await User.find({ _id: { $in: userIds } }, "username");
        const usernames = users.map((user) => user.username);
        return new Response(JSON.stringify({ usernames }), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch usernames", { status: 500 });
    }
};
