"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';


const EditGroup = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const groupId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        group_name: ''
    })

    useEffect(() => {
        const getGroupDetails = async () => {
            const response = await fetch(`/api/group/${groupId}`);
            const data = await response.json();

            setPost({
                group_name: data.group_name,
            });
        };

        if (groupId) getGroupDetails();
    }, [groupId]);
    

    const editGroup = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!groupId) return alert("Missing GroupID!");

        try {
            const response = await fetch(`/api/group/${groupId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    group_name: post.group_name,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
    return (

        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editGroup}
        />
    )
}

export default EditGroup;