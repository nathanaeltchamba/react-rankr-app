"use client";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={handleGroupNameChange}
            />
            <input
                type="text"
                placeholder="Enter group code"
                value={groupCode}
                onChange={handleGroupCodeChange}
            />
            <button type="submit">Join Group</button>
        </form>
    );
};

export default JoinGroupForm;
