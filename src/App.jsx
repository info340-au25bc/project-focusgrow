import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PlantStore from './pages/PlantStore';
import Garden from './pages/Garden';
import DailyTasks from './pages/DailyTasks';
import { PlantProvider } from './context/PlantContext';
import { TaskNotesProvider } from './context/TaskNotesContext';
import Dashboard from './pages/Dashboard';
import FocusTimer from './pages/FocusTimer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { usePlants } from './hooks/usePlants';

function ProtectedRoute({ children }) {
  const { user, loading } = usePlants();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { user } = usePlants();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login/>} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            } 
          />  
          <Route 
            path="garden" 
            element={
              <ProtectedRoute>
                <Garden/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="daily-tasks" 
            element={
              <ProtectedRoute>
                <DailyTasks/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="focus-timer" 
            element={
              <ProtectedRoute>
                <FocusTimer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="plant-store" 
            element={
              <ProtectedRoute>
                <PlantStore/>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  return (
    <PlantProvider>
      <TaskNotesProvider>
        <AppContent />
      </TaskNotesProvider>
    </PlantProvider>
  );
}

export default App;