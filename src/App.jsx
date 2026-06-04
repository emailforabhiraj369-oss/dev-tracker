import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



const INITIAL_JOBS = [
  { id: 1, company: "Google", role: "Frontend Engineer", status: "Applied" },
  { id: 2, company: "Meta", role: "React Developer", status: "Interviewing" },
  { id: 3, company: "Netflix", role: "UI Engineer", status: "Rejected" }
];

const newJob = { id: 4, company: "Apple", role: "iOS Developer", status: "Applied" };
function App() {

  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const [companyInput, setCompanyInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [statusInput,setStatusInput]=useState("Applied");

  function addJob() {

    const customJob = {
      id: Date.now(),
      company: companyInput,
      role: roleInput,
      status: statusInput

    }
    setJobs([...jobs, customJob]);

    setCompanyInput("");

    setRoleInput("");
    setStatusInput("Applied");
  }

  return (
    <>
      <h1>Day4 :Job Tracker</h1>
      <ul>
        {jobs.map((joblist, index) => {
          const { id, company, role, status } = joblist;
          return <li key={id}>{company}  {role} - {status}</li>
        }
        )}
      </ul>
      {/* custom company input */}

      <input type="text"
        placeholder='Enter Company name'
        value={companyInput}
        onChange={(e) => setCompanyInput(e.target.value)} />
       <br />

        {/* custom role input */}

        <input type="text" 
        placeholder='Enter job role'
        value={roleInput}
        onChange={(e)=>setRoleInput(e.target.value)}/>
        <br />
        <select value={statusInput} 
        onChange={(e)=>setStatusInput(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>

      <button onClick={addJob}>Add Job</button>
    </>
  )
}

export default App;
