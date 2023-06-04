"use client";

import { useState, useEffect } from 'react'

import GroupCard from './GroupCard';

const GroupCardList = ({ data }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <GroupCard
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    )
}

const GroupFeed = () => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([])

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('/api/group');
            const data = await response.json();

            setPosts(data);
        }

        fetchGroups();
    }, [])


    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a group'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <GroupCardList
                data={posts}
            />
        </section>
    )
}

export default GroupFeed