import { useState, useEffect } from 'react';
import Formular from './components/Formular.jsx';
import Header from './components/Header.jsx';
import PatientList from './components/PatientList.jsx';

function App() {

  const initialState = JSON.parse(localStorage.getItem("patients")) ?? []
  const [patients, setPatients] = useState(initialState);
  const [patient, setPatient] = useState({});

  useEffect( () => {
    localStorage.setItem( "patients", JSON.stringify(patients));
  }, [patients]);

  const deletePatient = patientId => {
    setPatients(patients.filter(patient => patient.id != patientId));
  };

  return (
    <div className="container mx-auto mt-20 " >
      <Header />
      <div className='md:flex mt-12'>
        <Formular 
          patients = {patients}
          setPatients = {setPatients}
          patient = {patient}
          setPatient = {setPatient}
          />
        <PatientList 
          patients = {patients}
          setPatient = {setPatient}
          deletePatient = {deletePatient}
        />
      </div>
    </div>
  )
}

export default App
