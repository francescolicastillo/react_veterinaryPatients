import { useState, useEffect } from "react";
import Error from "./Error";


const Formular = ( {patients, setPatients, patient, setPatient}) => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [error, setError] = useState(false);

    const generateID = () => {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if( [name, owner, email, date, symptoms].includes('') ) {
            setError(true);
            return;
        }
        
        setError(false);

        const objectPatient = {
            name: name,
            owner: owner,
            email: email,
            date: date,
            symptoms: symptoms
        }

        if(patient.id){
            objectPatient.id = patient.id;
            const newPatientList = patients.map( patientState => 
                patientState.id === patient.id ? objectPatient : patientState
            )
            setPatients(newPatientList);
            setPatient({});
        } else {
            objectPatient.id = generateID()
            setPatients([...patients, objectPatient]);
        }

        setName("");
        setOwner("");
        setEmail("");
        setDate("");
        setSymptoms("");
    }

    const editPatient = (patient) => {
        setName(patient.name);
        setOwner(patient.owner);
        setEmail(patient.email);
        setDate(patient.date);
        setSymptoms(patient.symptoms);
    }

    useEffect(() => {
        if(Object.keys(patient).length > 0)
            editPatient(patient)
    }, [patient])

    return (
        <div className="md:w-1/2 lg:delay-2/5">
            <h2 className="text-3xl font-bold text-center">Formular</h2>
            <p className="text-lg mt-5 text-center">Add new patients and 
                <span className="text-indigo-600 font-bold"> edit them</span>  
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mt-5 mb-10">

                {error && <Error> 
                    <p>All fields are required</p>
                </Error>}

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="petName">Pet's Name:</label>
                    <input 
                        className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                        type="text" 
                        placeholder="Pet's name"
                        id="petName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="owner">Owner:</label>
                    <input 
                        className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                        type="text" 
                        placeholder="Owner"
                        id="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">E-mail:</label>
                    <input 
                        className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                        type="email" 
                        placeholder="E-mail contact"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="date">Date:</label>
                    <input 
                        className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                        type="date" 
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="symptoms">Symptoms:</label>
                    <textarea 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"                       
                        placeholder="Describe symptoms"
                        id="symptoms" 
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-opacity"
                    value={ patient.id ? "Edit patiente": "Add patient"} 
                />

            </form>
        </div >
    )
}

export default Formular;