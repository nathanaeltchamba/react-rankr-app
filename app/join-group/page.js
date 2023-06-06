"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import JoinGroupForm from '@components/JoinGroupForm';

const JoinGroup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinGroup = async (groupName) => {
    try {
      const response = await fetch("/api/group/join", {
        method: "POST",
        body: JSON.stringify({ userId: userId, groupId: groupName }),
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
