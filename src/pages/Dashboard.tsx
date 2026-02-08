import { BookOpen, Users, ArrowLeftRight, Clock } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Total Buku', value: '1,240', icon: BookOpen, color: '#3b82f6' },
        { label: 'Peminjam Aktif', value: '45', icon: Users, color: '#10b981' },
        { label: 'Buku Dipinjam', value: '12', icon: ArrowLeftRight, color: '#f59e0b' },
        { label: 'Terlambat Kembali', value: '3', icon: Clock, color: '#ef4444' },
    ];

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Selamat datang kembali di sistem manajemen perpustakaan.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {stats.map((stat) => (
                    <div key={stat.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            background: `${stat.color}10`,
                            color: stat.color,
                            padding: '0.75rem',
                            borderRadius: '12px'
                        }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.5rem' }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Peminjaman Terakhir</h3>
                <div className="table-container" style={{ border: 'none' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Peminjam</th>
                                <th>Buku</th>
                                <th>Tanggal Pinjam</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Budi Santoso</td>
                                <td>Dasar Pemrograman Python</td>
                                <td>01 Feb 2026</td>
                                <td><span className="badge badge-warning">Dipinjam</span></td>
                            </tr>
                            <tr>
                                <td>Siti Aminah</td>
                                <td>Sejarah Indonesia Modern</td>
                                <td>28 Jan 2026</td>
                                <td><span className="badge badge-success">Dikembalikan</span></td>
                            </tr>
                            <tr>
                                <td>Andi Wijaya</td>
                                <td>Fisika Dasar Jilid 1</td>
                                <td>25 Jan 2026</td>
                                <td><span className="badge badge-success">Dikembalikan</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
