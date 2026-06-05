import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'






function App() {



  const [companyInput, setCompanyInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [statusInput, setStatusInput] = useState("Applied");
  const [applications, setApplications] = useState(() => {

    const savedApps = localStorage.getItem("dev-tracker-apps");
    console.log('1. Reading from localStorage on load:', savedApps)
    return savedApps ? JSON.parse(savedApps) : [];
  });
  // Day5 using local storage and useEffect
  useEffect(() => {
    console.log("2. useEffect running.Saving to localStorage:", applications);
    localStorage.setItem("dev-tracker-apps", JSON.stringify(applications))
  }, [applications]);


  function addJob() {

    //check to not add empt job or jo roles
    if (!companyInput || !roleInput) return;
    const customJob = {
      id: Date.now(),
      company: companyInput,
      role: roleInput,
      status: statusInput

    }
    setApplications([...applications, customJob]);

    setCompanyInput("");

    setRoleInput("");
    setStatusInput("Applied");
  }




  return (
    <>
      <h1>Day 5 :Job Tracker</h1>
      {/* Displaying the application list */}
      <ul>
        {applications.map((job) => {
          const { id, role, company } = job;
          return <li key={id}>  <strong>{company}</strong> - {role}
          </li>
        })}
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
        onChange={(e) => setRoleInput(e.target.value)} />
      <br />
      <select value={statusInput}
        onChange={(e) => setStatusInput(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>
      <div style={{ padding: '20px' }}>
        <button onClick={addJob}>Add Job</button>




      </div>
    </>
  )
}

export default App;
