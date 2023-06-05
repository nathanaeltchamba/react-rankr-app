"use client";

import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';


const MyProfile = () => {

  const router = useRouter();
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

  const handleEdit = (post) => {
    router.push(`/update-group/?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this Group?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/group/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
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