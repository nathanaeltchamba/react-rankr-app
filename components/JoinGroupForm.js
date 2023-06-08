"use client";

import Link from 'next/link';

import { useState } from 'react';

const JoinGroupForm = ({ handleJoinGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [groupCode, setGroupCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinGroup(groupName, groupCode);
    };

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleGroupCodeChange = (e) => {
        setGroupCode(e.target.value);
    };

    return (

        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className="head_text text-center ">
                <span className="blue_gradient">Let's Find Your Group</span>
            </h1>
            <p className="desc text-start max-w-md">
                By entering the Group Name and Code that corresponds with your group
            </p>
            <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>

                <label>
                    <span className="font-satoshi font-light text-base text-gray-800">
                        Enter Group Name
                    </span>
                    <input
                        type="text"
                        placeholder="ABC Group..."
                        value={groupName}
                        onChange={handleGroupNameChange}
                        className='form_input'
                    />
                </label>
                <label>
                    <span className="font-satoshi font-light text-base text-gray-800">
                        Enter 5 Digit Code Below
                    </span>
                    <input
                        type="text"
                        placeholder="ABC123"
                        value={groupCode}
                        onChange={handleGroupCodeChange}
                        className='form_input'
                    />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button className='blue_btn' type="submit">Join Group</button>
                </div>
            </form>
        </section>
    );
};

export default JoinGroupForm;
