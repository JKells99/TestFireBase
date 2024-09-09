import React, { useEffect, useState } from "react";
import cong from "./index"; // Assuming the correct path to your configuration file
import { getDatabase, ref, onValue } from "firebase/database";
import WriteToRealtimeDB from "./WriteToRealtimeDB";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/page/home";

// App.js

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(cong);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, "users");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  return (
      <BrowserRouter>
        <div>
          <section>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </section>
        </div>
      </BrowserRouter>
      // <>
      //   <div>
      //     <h1>Data from database:</h1>
      //     <ul>
      //       {data.map((item, index) => (
      //
      //
      //           <li key={item.id}>
      //             <p>{item.name}</p>
      //             <p>{item.email}</p>
      //           </li>
      //
      //
      //       ))}
      //     </ul>
      //   </div>
      //   <WriteToRealtimeDB/>
      // </>


  );
}

export default App;