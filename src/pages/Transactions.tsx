import { useState, useEffect } from 'react';
import { Search, User, Plus, ArrowRight } from 'lucide-react';
import { getTransactions, returnBook, getBooks } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (image: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
};

const Transactions = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [allBooks, setAllBooks] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let dbTransactions = [];
            try {
                // Fetch books to help with missing images
                try {
                    const booksRes = await getBooks();
                    setAllBooks(booksRes.data || []);
                } catch (e) {
                    console.warn("Failed to fetch books", e);
                }

                // Fetch transactions from database
                const response = await getTransactions();
                dbTransactions = response.data || [];
            } catch (error) {
                console.error("Failed to fetch transactions from server", error);
                // Server might be down, but we still want to show local data
            } finally {
                // Merge with local demo transactions
                const localTransactions = JSON.parse(localStorage.getItem('demo_transactions') || '[]');
                const combined = [...localTransactions, ...dbTransactions];
                setTransactions(combined);
            }
        };
        fetchData();
    }, []);

    const handleReturn = async (id: number) => {
        // Cek apakah ini transaksi demo lokal (offline)
        const demoTransactions = JSON.parse(localStorage.getItem('demo_transactions') || '[]');
        const isDemo = demoTransactions.some((t: any) => t.id === id);

        if (isDemo) {
            // Update status di localStorage untuk mode demo
            const updatedDemo = demoTransactions.map((t: any) =>
                t.id === id ? { ...t, status: 'Dikembalikan', return_date: new Date().toISOString().split('T')[0] } : t
            );
            localStorage.setItem('demo_transactions', JSON.stringify(updatedDemo));

            setTransactions(prev => prev.map(t =>
                t.id === id ? { ...t, status: 'Dikembalikan' } : t
            ));
            alert('Buku berhasil dikembalikan!');
            return;
        }

        try {
            await returnBook(id);
            setTransactions(prev => prev.map(t =>
                t.id === id ? { ...t, status: 'Dikembalikan' } : t
            ));
            alert('Buku berhasil dikembalikan!');
        } catch (error) {
            console.error("Failed to return book", error);
            alert('Gagal mengembalikan buku. Pastikan server backend berjalan.');
        }
    };

    const filteredTransactions = transactions.filter(t => {
        // Filter by role: if not admin, only show own transactions
        if (user && user.role !== 'admin') {
            return t.user_id == user.id;
        }
        return true;
    }).filter(t =>
        t.borrower_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.book_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Dipinjam': return { bg: '#fff7ed', text: '#9a3412', border: '#ffedd5' };
            case 'Dikembalikan': return { bg: '#f0fdf4', text: '#166534', border: '#dcfce7' };
            case 'Terlambat': return { bg: '#fef2f2', text: '#991b1b', border: '#fee2e2' };
            default: return { bg: '#f8fafc', text: '#475569', border: '#f1f5f9' };
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem' }}>Log Aktivitas Peminjaman</h1>
                    <p style={{ color: '#64748b' }}>Pantau semua sirkulasi buku perpustakaan kamu</p>
                </div>
                <button
                    onClick={() => navigate('/app/transaksi/baru')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6',
                        color: 'white', borderRadius: '12px', border: 'none',
                        fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                    <Plus size={20} />
                    Tambah Pinjaman
                </button>
            </div>

            {/* Content Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                {/* Tables Actions */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                    <div style={{ position: 'relative', maxWidth: '400px' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                        <input
                            type="text"
                            placeholder="Cari nama peminjam atau judul buku..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem 1rem 0.75rem 3rem',
                                borderRadius: '12px', border: '1px solid #e2e8f0',
                                outline: 'none', fontSize: '0.95rem'
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Detail Peminjaman</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Durasi Pinjam</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((t) => {
                                    const style = getStatusStyle(t.status);
                                    return (
                                        <tr key={t.id} style={{ transition: 'background 0.2s' }}>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <div style={{ width: '40px', height: '56px', borderRadius: '4px', overflow: 'hidden', background: '#f1f5f9', flexShrink: 0 }}>
                                                        <img
                                                            src={getImageUrl(t.cover_image || allBooks.find(b => b.title === t.book_title)?.cover_image)}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300'}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                            <User size={14} style={{ color: '#3b82f6' }} />
                                                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{t.borrower_name}</span>
                                                        </div>
                                                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{t.book_title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', fontSize: '0.875rem' }}>
                                                    <span>{t.borrow_date}</span>
                                                    <ArrowRight size={14} style={{ color: '#94a3b8' }} />
                                                    <span style={{ color: t.status === 'Terlambat' ? '#ef4444' : 'inherit', fontWeight: t.status === 'Terlambat' ? '600' : 'normal' }}>{t.due_date}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <span style={{
                                                    padding: '0.375rem 0.75rem', borderRadius: '99px',
                                                    fontSize: '0.75rem', fontWeight: 'bold',
                                                    backgroundColor: style.bg, color: style.text,
                                                    border: `1px solid ${style.border}`
                                                }}>
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                {t.status === 'Dipinjam' || t.status === 'Terlambat' ? (
                                                    <button
                                                        onClick={() => handleReturn(t.id)}
                                                        style={{
                                                            padding: '0.5rem 1rem', borderRadius: '8px',
                                                            border: '1px solid #e2e8f0', background: 'white',
                                                            fontSize: '0.875rem', fontWeight: '500', color: '#1e293b',
                                                            cursor: 'pointer', transition: 'all 0.2s'
                                                        }}
                                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                                                    >
                                                        Kembalikan
                                                    </button>
                                                ) : (
                                                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Transaksi Selesai</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                        Belum ada riwayat transaksi peminjaman.
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

export default Transactions;
