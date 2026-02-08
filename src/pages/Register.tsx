import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Library, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // MOCK REGISTER BYPASS
        setTimeout(() => {
            alert('Registrasi berhasil (Bypass)! Silakan login.');
            navigate('/login');
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Daftar Akun Baru</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Bergabung dengan komunitas perpustakaan kami.</p>
                </div>

                {error && (
                    <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Nama Lengkap</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="text"
                                placeholder="Jon"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="email"
                                placeholder="user@lib.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Daftar Sekarang'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Sudah punya akun? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Masuk di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
