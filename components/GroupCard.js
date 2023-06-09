"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

const GroupCard = ({ post, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMemberUsernames = async () => {
            try {
                const response = await fetch("/api/users/usernames", {
                    method: "POST",
                    body: JSON.stringify({ userIds: post.members }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                const memberUsernames = data.usernames;
                setMembers(memberUsernames);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMemberUsernames();
    }, [post.members]);

    return (
        <div className="prompt_card glassmorphism">
            <div className="flex justify-start items-start gap-5">
                <Image
                    src={post.creator.image}
                    alt="user_image"
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
                />

                <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-900 italic">
                        {post.group_name}
                    </h3>
                    <p className="font-inter text-xs text-gray-500">
                        <span className="text-center">Group Host</span>{" "}
                        {post.creator.username}
                    </p>
                    <p className="font-inter text-xs text-gray-500">
                        Group Members:{" "}
                        {members.map((member) => member).join(", ")}
                    </p>

                    <Link className="text-sm mt-2 blue_gradient" href={'/group' + '?id=' + post._id} >
                        View Group
                    </Link>
                </div>
            </div>

            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p
                        className="font-inter text-sm blue_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm red_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
};

export default GroupCard;
