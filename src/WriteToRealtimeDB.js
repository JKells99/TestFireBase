import React, { useState } from 'react';
import { database } from './index';  // Import your Firebase Realtime Database instance
import { ref, set } from 'firebase/database';

const WriteToRealtimeDB = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = new Date().getTime().toString(); // You can also use Firebase's `push()` to generate unique IDs

        set(ref(database, 'users/' + userId), {
            name: name,
            email: email
        })
            .then(() => {
                setSuccess(true);
                setName('');
                setEmail('');
            })
            .catch((error) => {
                console.error("Error writing to Realtime Database: ", error);
            });
    };

    return (
        <div>
            <h2>Write to Realtime Database</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add User</button>
            </form>

            {success && <p>User added successfully!</p>}
        </div>
    );
};

export default WriteToRealtimeDB;
