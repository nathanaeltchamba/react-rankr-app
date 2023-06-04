"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const GroupCard = ({ post, handleEdit, handleDelete }) => {

    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    return (
        <div className="prompt_card glassmorphism">
            <div className="flex justify-between items-start gap-5">
                <Image
                    src={post.creator.image}
                    alt='user_image'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                />


                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {post.group_name}
                    </h3>
                    <p className='font-inter text-xs text-gray-500'>
                        Host: {post.creator.username}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GroupCard