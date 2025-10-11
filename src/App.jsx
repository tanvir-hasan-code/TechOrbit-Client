import React from 'react';
import useTitle from './Hooks/useTitle';

const App = () => {
  useTitle("App")
  return (
    <div>
      <h3 className="text-4xl">Hello From App Component</h3>
    </div>
  );
};

export default App;