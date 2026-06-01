import React, { useState } from 'react';
import { supabase } from '../client'; // <-- Import your database client

const AddCreator = () => {
    // Set up a state object to track the form inputs
    const [creator, setCreator] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    // This function updates the state whenever a user types in a box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // This function runs when the user hits the "Submit" button
    const addCreator = async (event) => {
        event.preventDefault(); // Prevents the browser from refreshing the page automatically

        // Send the data to the 'creators' table in Supabase
        await supabase
            .from('creators')
            .insert([
                {
                    name: creator.name,
                    url: creator.url,
                    description: creator.description,
                    imageURL: creator.imageURL
                }
            ]);

        // Redirect the user back to the home page so they can see their new creator!
        window.location = "/"; 
    };

    return (
        <div className="add-creator-page">
            <h2>Add a New Creator</h2>
            
            {/* Attach the addCreator function to the form submission */}
            <form onSubmit={addCreator}>
                <label>Name</label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

                <label>URL (Channel/Page Link)</label>
                <input type="url" id="url" name="url" value={creator.url} onChange={handleChange} required />

                <label>Description</label>
                <textarea rows="3" cols="50" id="description" name="description" value={creator.description} onChange={handleChange} required></textarea>

                <label>Image URL (Optional)</label>
                <input type="url" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} />

                <button type="submit">Submit Creator</button>
            </form>
        </div>
    );
};

export default AddCreator;