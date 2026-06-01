import React, { useState } from 'react';
import { supabase } from '../client';

const AddCreator = () => {
    const [creator, setCreator] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addCreator = async (event) => {
        event.preventDefault();

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

        window.location = "/";
    };

    return (
        <div className="add-creator-page">
            <h2>Add a New Creator</h2>

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
