import React, { useState, useEffect } from 'react';
import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from '../../index';
import DisplayUser from "../DisplayUser";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {

                // User is signed out
                // ...
                console.log("user is logged out")
            }
        });

    }, [])

    return (
        <section>
            <nav>
                <p>
                    Welcome Home
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <DisplayUser/>

        </section>
    )
}

export default Home