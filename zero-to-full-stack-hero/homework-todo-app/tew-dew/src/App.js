import React from 'react';
import { Header, Quote, Tasks } from './components';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Quote />
      <Tasks />
    </div>
  );  
}

export default App;
