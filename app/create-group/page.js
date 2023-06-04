"use client";

import React from 'react'
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
  })

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
        console.log(data);
        router.push("/");
      }
    } catch (error) {
      console.log("Error:", error);

    } finally {
      setSubmitting(false);
    }
  };

  return (

    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createGroup}
    />
  )
}

export default CreateGroup;