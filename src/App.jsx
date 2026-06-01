import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
import { supabase } from './client';

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select();

      if (data) {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  let element = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} /> },
    { path: "/new", element: <AddCreator /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> }
  ]);

  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
