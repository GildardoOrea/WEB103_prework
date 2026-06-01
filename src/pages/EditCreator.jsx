import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const { id } = useParams();
    
    const [creator, setCreator] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (data) {
                setCreator(data);
            }
        };

        fetchCreator();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCreator = async (event) => {
        event.preventDefault();

        await supabase
            .from('creators')
            .update({
                name: creator.name,
                url: creator.url,
                description: creator.description,
                imageURL: creator.imageURL
            })
            .eq('id', id);

        window.location = "/";
    };

    // 1. Add this brand new delete function!
    const deleteCreator = async (event) => {
        event.preventDefault();
        
        await supabase
            .from('creators')
            .delete()
            .eq('id', id); // CRITICAL: Tell it exactly which row to trash

        // Send them back to the home page
        window.location = "/";
    };

    return (
        <div className="edit-creator-page">
            <h2>Edit Creator</h2>
            
            <form onSubmit={updateCreator}>
                <label>Name</label>
                <input type="text" name="name" value={creator.name} onChange={handleChange} required />

                <label>URL (Channel/Page Link)</label>
                <input type="url" name="url" value={creator.url} onChange={handleChange} required />

                <label>Description</label>
                <textarea rows="3" name="description" value={creator.description} onChange={handleChange} required></textarea>

                <label>Image URL (Optional)</label>
                <input type="url" name="imageURL" value={creator.imageURL || ""} onChange={handleChange} />

                {/* 2. Update your button area to include the Delete option */}
                <div className="button-group">
                    <button type="submit">Update Creator</button>
                    {/* Make sure type="button" so it doesn't accidentally trigger the form submit! */}
                    <button type="button" className="secondary destructive" onClick={deleteCreator}>
                        Delete Creator
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCreator;