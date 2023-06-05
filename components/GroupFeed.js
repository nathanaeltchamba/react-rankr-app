"use client";

import { useState, useEffect } from 'react'

import GroupCard from './GroupCard';

const GroupCardList = ({ data }) => {
    // console.log(data)
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
    const [posts, setPosts] = useState([])

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterGroups = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.group_name)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterGroups(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

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

            <section>
                <div className='head_text1 pink_gradient'>
                    <h4>Join A Group</h4>
                </div>
            </section>

            {/* All Gruops */}
            {searchText ? (
                <GroupCardList
                    data={searchedResults}
                />
            ) : (
                <GroupCardList data={posts} />
            )}
        </section>
    )
}

export default GroupFeed