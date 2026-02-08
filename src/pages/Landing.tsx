import { useNavigate } from 'react-router-dom';
import { BookOpen, ShieldCheck, Zap, Library } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: 'white' }}>
            {/* Navbar */}
            <nav style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '8px', color: 'white' }}>
                        <Library size={24} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a' }}>perpustakaan</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate('/login')} className="btn btn-outline">Masuk</button>
                    <button onClick={() => navigate('/register')} className="btn btn-primary">Daftar Sekarang</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ padding: '8rem 5%', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                    Manajemen Perpustakaan Sekolah <br />
                    <span style={{ color: 'var(--primary)' }}>Lebih Cerdas & Praktis</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    Solusi administrasi digital untuk perpustakaan sekolah. Kelola buku, peminjaman, dan data anggota dalam satu platform yang stabil dan profesional.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/register')} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }} className="btn btn-primary">Mulai Sekarang</button>
                    <button onClick={() => navigate('/login')} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }} className="btn btn-outline">Lihat Katalog</button>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '5rem 5%', background: '#f8fafc' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ background: '#eff6ff', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <BookOpen size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Katalog Digital</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Cari dan temukan koleksi buku terbaik dengan fitur filter genre dan penulis.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ background: '#f0fdf4', color: '#16a34a', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Zap size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Pinjam Instan</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Proses peminjaman buku yang cepat dengan pencatatan durasi otomatis.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ background: '#fff7ed', color: '#ea580c', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Keamanan Data</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Sistem login yang aman dan pembatasan hak akses sesuai peran (Admin/Member).</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 5%', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid #f1f5f9' }}>
                <p>&copy; 2026 perpustakaan - Kerja Kelompok Semester 2</p>
            </footer>
        </div>
    );
};

export default Landing;
