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


  // Day6 filter and delete wrt job.id
  const deleteJob = (id) => {
    const updatedApps = applications.filter(job => job.id !== id);
    setApplications(updatedApps)
  }
  // Day5 using local storage and useEffect
  useEffect(() => {
    console.log("2. useEffect running.Saving to localStorage:", applications);
    localStorage.setItem("dev-tracker-apps", JSON.stringify(applications))
  }, [applications]);



// state to manage search
  const [searchQuery,setSearchQuery]=useState("");
  // state to manage filter
  const [filterStatus,setFilterStatus]=useState("All");

   // Day7 :Filter engine combining search and status
    const filteredApplications=applications.filter((job)=>{
      const matchesSearch=
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());

      // check if status dropwown matches or if"All" is selected
      const matchesStatus=filterStatus === "All" || job.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
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

    {/* Day7: filter & search input section */}

    <div style={{backgroundColor: '#f4f4f5',padding: '15px',borderRadius:'8px',marginBottom:'20px'}}>

    <h3>Filters & Search</h3>
    <input type="text"
    placeholder='Search company or role ...' 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{padding:'8px', marginRight: '10px', width: '250px'}}

    />
    <select value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    style={{padding :'8px'}}
    >
      <option value="All">All statuses</option>
      <option value="Applied">Applied</option>
      <option value="Interviewing">Interviewing</option>
      <option value="Offered">Offered</option>
      <option value="Rejected">Rejected</option>
    

    </select>
    </div>

      <h1>Day 7 :Job Tracker</h1>
      {/* Displaying the application list */}
      <ul>
        {filteredApplications.map((job) => {
          const { id, role, company, status } = job;
          return (<li key={id}>  <strong>{company}</strong> - {role} [{status}]
            <button onClick={() => deleteJob(id)}>Delete Job</button>

          </li>)
        })}
        {filteredApplications.length ===0 && <p style={{color:'gray'}}>No application match your criteria</p>}
      </ul>

<h3>Add New application</h3>
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
      <div style={{ padding: '20px 0' }}>
        <button onClick={addJob}>Add Job</button>
        <br />
       
      </div>
    </>
  )
}

export default App;
