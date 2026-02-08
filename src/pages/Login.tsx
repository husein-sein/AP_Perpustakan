import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Library, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // MOCK LOGIN BYPASS (Requested by user)
        setTimeout(() => {
            const isAdmin = email.toLowerCase().includes('admin');
            const mockUser = {
                id: isAdmin ? 1 : 2,
                name: isAdmin ? 'Admin Utama' : 'Jon Member',
                email: email || (isAdmin ? 'admin@lib.com' : 'user@lib.com'),
                role: (isAdmin ? 'admin' : 'user') as 'admin' | 'user',
                profile_image: isAdmin ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100' : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100'
            };
            // Use a dummy token for the bypass
            login('mock-jwt-token-bypass', mockUser);
            navigate('/app/dashboard');
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '12px', color: 'white', display: 'inline-block', marginBottom: '1rem' }}>
                        <Library size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Masuk Perpustakaan</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Selamat datang kembali di perpustakaan digital.</p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="email"
                                placeholder="admin@lib.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Masuk'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Belum punya akun? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Daftar di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
