import { useState, useEffect } from 'react';
import { BookOpen, ArrowLeftRight, Clock, User } from 'lucide-react';
import { getBooks, getTransactions } from '../services/api';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (image: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const Dashboard = () => {
    const { user } = useAuth();
    const [allDbTransactions, setAllDbTransactions] = useState<any[]>([]);
    const [totalBooks, setTotalBooks] = useState(0);

    const fetchData = async () => {
        try {
            const [booksRes, transRes] = await Promise.all([
                getBooks(),
                getTransactions()
            ]);
            const books = Array.isArray(booksRes.data) ? booksRes.data : booksRes.data?.data ?? [];
            const dbTrans = Array.isArray(transRes.data) ? transRes.data : transRes.data?.data ?? [];
            setTotalBooks(books.length);
            setAllDbTransactions(dbTrans);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        }
    };

    useEffect(() => {
        if (!user) return; // Tunggu user keload dulu dari AuthContext
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [user?.id]); // Re-fetch kalau user berubah (login/logout)

    // Gabung localStorage (demo/offline) + DB, sama persis seperti Transactions.tsx
    const localTransactions: any[] = JSON.parse(localStorage.getItem('demo_transactions') || '[]');
    const combinedTrans = [...localTransactions, ...allDbTransactions];

    // Filter by role: admin lihat semua, user lihat punya sendiri
    const isAdmin = user?.role === 'admin';
    const allTransactions = isAdmin
        ? combinedTrans
        : combinedTrans.filter((t: any) => String(t.user_id) === String(user?.id));

    // Hitung stats langsung dari data transaksi
    const borrowedBooks = allTransactions.filter((t: any) => t.status === 'Dipinjam').length;
    const returnedBooks = allTransactions.filter((t: any) => t.status === 'Dikembalikan').length;
    const lateReturns = allTransactions.filter((t: any) => {
        if (t.status !== 'Dipinjam') return false;
        const due = new Date(t.due_date);
        due.setHours(0, 0, 0, 0);
        return due < today;
    }).length;

    const recentTransactions = allTransactions.slice(0, 8);

    // Stats berbeda untuk admin vs user
    const stats = isAdmin ? [
        { label: 'Total Buku', value: totalBooks.toLocaleString(), icon: BookOpen, color: '#3b82f6' },
        { label: 'Buku Dipinjam', value: borrowedBooks.toLocaleString(), icon: ArrowLeftRight, color: '#f59e0b' },
        { label: 'Terlambat Kembali', value: lateReturns.toLocaleString(), icon: Clock, color: '#ef4444' },
    ] : [
        { label: 'Sedang Dipinjam', value: borrowedBooks.toLocaleString(), icon: ArrowLeftRight, color: '#f59e0b' },
        { label: 'Sudah Dikembalikan', value: returnedBooks.toLocaleString(), icon: BookOpen, color: '#10b981' },
        { label: 'Terlambat Kembali', value: lateReturns.toLocaleString(), icon: Clock, color: '#ef4444' },
    ];

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {isAdmin
                        ? 'Pantau status perpustakaan secara real-time.'
                        : `Halo, ${user?.name}! Pantau aktivitas pinjaman kamu di sini.`}
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                {stats.map((stat) => (
                    <div key={stat.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem' }}>
                        <div style={{
                            background: `${stat.color}10`,
                            color: stat.color,
                            padding: '1rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Log Aktivitas Peminjaman</h3>
                <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                        <thead>
                            <tr style={{ background: 'transparent' }}>
                                <th style={{ background: 'transparent', border: 'none', paddingBottom: '1rem' }}>DETAIL PEMINJAMAN</th>
                                <th style={{ background: 'transparent', border: 'none', paddingBottom: '1rem' }}>DURASI PINJAM</th>
                                <th style={{ background: 'transparent', border: 'none', paddingBottom: '1rem' }}>STATUS</th>
                                <th style={{ background: 'transparent', border: 'none', paddingBottom: '1rem', textAlign: 'right' }}>AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((t) => (
                                <tr key={t.id} style={{ background: 'white' }}>
                                    <td style={{ padding: '4px 0', border: 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '48px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9' }}>
                                                <img
                                                    src={getImageUrl(t.cover_image)}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.925rem' }}>
                                                    <User size={14} style={{ color: '#3b82f6' }} />
                                                    {t.borrower_name}
                                                </div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.825rem', marginTop: '2px' }}>
                                                    {t.book_title}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ border: 'none', fontSize: '0.875rem', color: '#475569' }}>
                                        {new Date(t.borrow_date).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
                                        <span style={{ margin: '0 10px', color: '#94a3b8' }}>→</span>
                                        {new Date(t.due_date).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
                                    </td>
                                    <td style={{ border: 'none' }}>
                                        <span className={`badge ${t.status === 'Dipinjam' ? 'badge-warning' : 'badge-success'}`} style={{ borderRadius: '6px', padding: '6px 12px' }}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td style={{ border: 'none', textAlign: 'right' }}>
                                        <button
                                            className="btn btn-outline"
                                            style={{
                                                fontSize: '0.825rem',
                                                padding: '6px 16px',
                                                borderRadius: '8px',
                                                borderColor: '#e2e8f0',
                                                color: t.status === 'Dipinjam' ? '#1e293b' : '#94a3b8'
                                            }}
                                            disabled={t.status !== 'Dipinjam'}
                                        >
                                            {t.status === 'Dipinjam' ? 'Kembalikan' : 'Transaksi Selesai'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {recentTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        Belum ada data aktivitas peminjaman.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
