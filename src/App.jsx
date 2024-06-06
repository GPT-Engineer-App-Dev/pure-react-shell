import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";

import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from './integrations/supabase/auth';

function App() {
  const { session } = useSupabaseAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={session ? <Index /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
}

export default App;
