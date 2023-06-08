"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import JoinGroupForm from '@components/JoinGroupForm';

const JoinGroup = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinGroup = async ( groupName, groupCode) => {
    try {
      const response = await fetch("/api/group/join", {
        method: "POST",
        body: JSON.stringify({ groupName: groupName, groupCode: groupCode, userId: session?.user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to group page or display success message
        router.push("/");
      } else if (response.status === 400) {
        setErrorMessage("You are already a member of this group");
      } else if (response.status === 404) {
        setErrorMessage("Group not found");
      } else {
        setErrorMessage("Failed to join the group");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-400 rounded text-white p-4">
          {errorMessage}
        </div>
      )}
      <JoinGroupForm handleJoinGroup={handleJoinGroup} />
    </div>
  );
};

export default JoinGroup;
