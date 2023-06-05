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

    const [errorMessage, setErrorMessage] = useState('');

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
            else if (response.status === 400) {
                setErrorMessage("Group name already exists");
            } else {
                setErrorMessage("Failed to update a group");
            }
        } catch (error) {
            console.log(error);
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
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editGroup}
            />
        </div>
    )
}

export default EditGroup;