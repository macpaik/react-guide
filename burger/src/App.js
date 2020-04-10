import React from 'react';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
      </Layout>
      <BurgerBuilder />
    </div>
  );
}

export default App;
