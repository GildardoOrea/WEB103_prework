import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchSingleCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single();

            if (data) {
                setCreator(data);
            }
        };

        fetchSingleCreator();
    }, [id]);

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
