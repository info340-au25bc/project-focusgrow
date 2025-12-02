import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PlantStore from './pages/PlantStore';
import Garden from './pages/Garden';
import DailyTasks from './pages/DailyTasks';
import { PlantProvider } from './context/PlantContext';
import Dashboard from './pages/Dashboard';
import FocusTimer from './pages/FocusTimer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (

    <PlantProvider>
        <Layout>
        <Routes>
            <Route path="/" element={<Dashboard/>} />  
            <Route path="garden" element={<Garden/>} />
            <Route path="daily-tasks" element={<DailyTasks/>} />
            <Route path="focus-timer" element={<FocusTimer />} />
            <Route path="plant-store" element={<PlantStore/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Layout>
    </PlantProvider>
  );
}

export default App;