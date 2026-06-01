import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    // useParams() grabs the dynamic :id variable from the URL
    const { id } = useParams();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchSingleCreator = async () => {
            // Fetch the specific row where the database 'id' matches the URL 'id'
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single(); // .single() tells Supabase we only want one object, not an array

            if (data) {
                setCreator(data);
            }
        };

        fetchSingleCreator();
    }, [id]);

    // Show a loading message while waiting for the database response
    if (!creator) return <h2>Loading...</h2>;

    return (
        <div className="view-creator-page">
            <article>
                {creator.imageURL && (
                    <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: '300px' }} />
                )}
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>

                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                    <button>Visit Channel</button>
                </a>

                {/* A quick way to get back to the home page */}
                <Link to="/">
                    <button className="secondary">Back to all creators</button>
                </Link>
                <Link to={`/edit/${creator.id}`}>
                    <button className="secondary">Edit Creator</button>
                </Link>
            </article>
        </div>
    );
};

export default ViewCreator;