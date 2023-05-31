"use client";

import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';


// const router = useRouter();
const CreateGroup = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: ''
  })

  const createGroup = async (e) => {

    e.preventDefault();

    setSubmitting(true);

    console.log('Before try/fetch');

    try {
      const response = await fetch("api/group/new", {
        method: "POST",
        body: JSON.stringify({
          name: post.name,
          userId: session?.user.id,
        }),
      });
      
      console.log('After fetch');

      console.log("Response status:", response.status);

      if (response.ok) {
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