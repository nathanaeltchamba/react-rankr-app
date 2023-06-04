"use client";

import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Profile from '@components/Profile';


const MyProfile = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user.id) fetchGroups();
  }, [])

  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }

  return (
    <Profile 
    name="My"
    desc="Welcome to your Personalized Profile"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile