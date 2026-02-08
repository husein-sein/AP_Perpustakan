import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Borrowers from './pages/Borrowers';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactElement, adminOnly?: boolean }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="buku" element={<ProtectedRoute adminOnly><Books /></ProtectedRoute>} />
        <Route path="peminjam" element={<ProtectedRoute adminOnly><Borrowers /></ProtectedRoute>} />
        <Route path="transaksi" element={<Transactions />} />
        <Route path="transaksi/baru" element={<AddTransaction />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
