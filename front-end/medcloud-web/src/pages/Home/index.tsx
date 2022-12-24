import React from 'react';
import Header from '../../components/Header'
import { PatientList } from '../../components/PatientsList';

import './style.css';

function Home() {
  return (
    <React.Fragment>
      <Header />
      <div className='page-body'> 
        <PatientList />
      </div>
    </React.Fragment>
  );
}

export default Home
