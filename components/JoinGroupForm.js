"use client";

import { useState } from 'react';

const JoinGroupForm = ({ handleJoinGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinGroup(groupName);
    };

    const handleChange = (e) => {
        setGroupName(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={handleChange}
            />
            <button type="submit">Join Group</button>
        </form>
    );
};

export default JoinGroupForm;
