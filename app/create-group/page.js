"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateGroup = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    group_name: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const createGroup = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/group/new", {
        method: "POST",
        body: JSON.stringify({
          group_name: post.group_name,
          userId: session?.user.id,
          members: post.members
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push("/");
      } else if (response.status === 400) {
        setErrorMessage("Group name already exists");
      } else {
        setErrorMessage("Failed to create a group");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-400 rounded text-white p-4">
          {errorMessage}
        </div>
      )}
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createGroup}
      />
    </div>
  );
};

export default CreateGroup;
