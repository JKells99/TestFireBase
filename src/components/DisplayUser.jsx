import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../index"; // make sure to import your firebase config

function DisplayUser(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <section>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}!</h2>
                    <p>Email: {user.email}</p>
                    <p>User ID: {user.uid}</p>
                </div>
            ) : (
                <h2>User is logged out</h2>
            )}
        </section>
    );
}

export default DisplayUser;