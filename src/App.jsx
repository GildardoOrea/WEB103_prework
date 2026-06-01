import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
// You will import your page components here once you build them
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import { supabase } from './client';

function App() {

  // state variable to hold the creators
  const [creators, setCreators] = useState([]);

  // useEffect runs the code inside it when the component first loads
  useEffect(() => {
    const fetchCreators = async () => {
      // Fetch all rows from the 'creators' table
      const { data, error } = await supabase
        .from('creators')
        .select();

      // If it successfully fetched the data, save it to state
      if (data) {
        setCreators(data);
      }
    };

    fetchCreators(); // Don't forget to actually call the function!
  }, []); // The empty array means this only runs once

  let element = useRoutes([
    { 
      path: "/", 
      // Pass the fetched creators down to the ShowCreators page as a prop
      element: <ShowCreators creators={creators} /> 
    },
    { path: "/new", element: <AddCreator /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> }
  ]);

  // Render the current route
  return (
    <div className="App">
      {element}
    </div>
  )
}

export default App