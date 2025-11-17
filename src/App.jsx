import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PlantStore from './pages/PlantStore';
import Garden from './pages/Garden';
import DailyTasks from './pages/DailyTasks';
import { PlantProvider } from './context/PlantContext';

//add imports for rest of pages

function App() {
  return (

    // ADD ROUTES AS YOU MAKE UR PAGE
    <PlantProvider>
        <Layout>
        <Routes>
            <Route path="/" element={<div>Home Page</div>} />  
            <Route path="/garden" element={<Garden/>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/daily-tasks" element={<DailyTasks/>} />
            <Route path="/focus-timer" element={<div>Focus Timer</div>} />
            <Route path="/plant-store" element={<PlantStore/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Layout>
    </PlantProvider>
  );
}

export default App;