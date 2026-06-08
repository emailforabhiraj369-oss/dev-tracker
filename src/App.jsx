import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'






function App() {

  // =================================
// 1. STATE Declarations
// =================================

  const [companyInput, setCompanyInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [statusInput, setStatusInput] = useState("Applied");
  const [applications, setApplications] = useState(() => {
    const savedApps = localStorage.getItem("dev-tracker-apps");
    console.log('1. Reading from localStorage on load:', savedApps)
    return savedApps ? JSON.parse(savedApps) : [];
  });

  // Day 7 :Search  and filter state grouped with ither states
  const [searchQuery,setSearchQuery]=useState("");
  const [filterStatus,setFilterStatus]=useState("All");
  
  // =================================
  // 2.SIDE EFFECTS(USEeFFECT)
  // =================================
  // Day 5: Syncing with localStorage
  
  useEffect(() => {
    console.log("2. useEffect running.Saving to localStorage:", applications);
    localStorage.setItem("dev-tracker-apps", JSON.stringify(applications))
  }, [applications]);

  // =================================
  //  3. DERIVED STATE ENGINES
  // =================================
   // Day7 :Filter engine combining search and status
    const filteredApplications=applications.filter((job)=>{
      const matchesSearch=
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());

      // check if status dropwown matches or if"All" is selected
      const matchesStatus=filterStatus === "All" || job.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

   // Day 8 -Performance metric board CALCULATIONS

    const totalApps =applications.length;

    const totalInterviews = applications.filter(job => job.status === "Interviewing").length;
    const totalOffers = applications.filter(job => job.status ==="Offered").length;


    // to prevent division by zero if there a re no applications yet
    const conversionRate = totalApps > 0 ?((totalInterviews /totalApps) *100).toFixed(1) : "0.0";



  


  // =================================
  //4.Event handlers(Action Functions)
  // =================================
  // Day 5 & 6

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

  // Day6 filter and delete wrt job.id
  const deleteJob = (id) => {
    const updatedApps = applications.filter(job => job.id !== id);
    setApplications(updatedApps)
  }

  
// =================================
// 5.RENDER RETURN
// =================================
  
  return (
    <>
    
          <h1>Day 8 :Job Tracker Dashboard</h1>


      {/* Day 8: Permormance metrics Dashboard Row */}
      <div className='metrics-container'>
        <div className="metric-card">
          <h4>Total Applications</h4>
          <p style={{ color : '#3b82f6'}}>{totalApps}</p>
        </div>
         <div className="metric-card">
          <h4>Interviews</h4>
          <p style={{ color : '#eab308'}}>{totalInterviews}</p>
        </div>
         <div className="metric-card">
          <h4>Offers Received</h4>
          <p style={{ color : '#22c55e'}}>{totalOffers}</p>
        </div>
         <div className="metric-card">
          <h4>Conversion Rate</h4>
          <p style={{ color : '#a855f7'}}>{conversionRate}%</p>
        </div>


      </div>
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
