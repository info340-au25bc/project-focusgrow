import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PlantStore from './components/pages/PlantStore';
//add imports for rest of pages

function App() {
  return (

    // ADD ROUTES AS PAGES ARE BEING CREATED

    <Layout>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />  
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/daily-tasks" element={<div>Daily Tasks</div>} />
        <Route path="/focus-timer" element={<div>Focus Timer</div>} />
        <Route path="/plant-store" element={<PlantStore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;