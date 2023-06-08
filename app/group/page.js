"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";

const GroupPage = ({post}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('id');

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMemberUsernames = async () => {
      try {
        const response = await fetch("/api/users/usernames", {
          method: "POST",
          body: JSON.stringify({ userIds: group.members }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(group)
        const data = await response.json();
        const memberUsernames = data.usernames;
        // console.log('MemberUsername', memberUsernames);
        setMembers(memberUsernames);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemberUsernames();
  }, [group]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`/api/group/${groupId}`);
        const data = await response.json();
        setGroup(data);
        // console.log(data)
      } catch (error) {
        console.error('Failed to fetch group:', error);
      }
    };
    fetchGroup();
  }, []);

  if (!group) {
    // Will Add loading function later
    return null;
  }

  return (
    <section>
      <section>
        <div className='head_text1 pink_gradient text-left'>
          <h1>{group.group_name}'s Room</h1>
          <h1>{group.code}</h1>
        </div>
      </section>
      <ul>
        {members.map((member) => (
          <li className="" key={member}>
            {member}
            {/* <Image 
              src={member.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            /> */}
          </li>
        ))}
      </ul>
      {/* Render other group details */}
    </section>
  );
};

export default GroupPage;
