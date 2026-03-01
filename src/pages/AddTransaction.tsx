import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooks, getBorrowers, createTransaction } from '../services/api';
import { Save, X, Calendar, User, Book } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (image: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
};

const AddTransaction = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const preSelectedBookId = location.state?.bookId || '';

    const [formData, setFormData] = useState({
        borrower_id: (user && user.role !== 'admin') ? user.id.toString() : '',
        book_id: preSelectedBookId,
        borrow_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    const [books, setBooks] = useState<any[]>([]);
    const [borrowers, setBorrowers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksRes, borrowersRes] = await Promise.all([getBooks(), getBorrowers()]);

                // Use data if exists, otherwise use fallback
                const booksData = booksRes.data.length > 0 ? booksRes.data : [
                    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300' },
                    { id: 2, title: 'Bumi', author: 'Tere Liye', cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300' },
                    { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', cover_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300' },
                    { id: 4, title: 'Negeri 5 Menara', author: 'A. Fuadi', cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300' },
                    { id: 5, title: 'Pulang', author: 'Leila S. Chudori', cover_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300' },
                    { id: 6, title: 'Laut Bercerita', author: 'Leila S. Chudori', cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300' },
                    { id: 7, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', cover_image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=300' },
                    { id: 8, title: 'Ronggeng Dukuh Paruk', author: 'Ahmad Tohari', cover_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300' },
                    { id: 9, title: 'Perahu Kertas', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300' },
                    { id: 10, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', cover_image: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?q=80&w=300' },
                    { id: 11, title: 'Dilan 1990', author: 'Pidi Baiq', cover_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=300' },
                    { id: 12, title: 'Supernova', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300' },
                    { id: 13, title: 'Hujan', author: 'Tere Liye', cover_image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300' },
                    { id: 14, title: 'Sang Pemimpi', author: 'Andrea Hirata', cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300' },
                    { id: 15, title: 'Garis Waktu', author: 'Fiersa Besari', cover_image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=300' },
                    { id: 16, title: 'Madre', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=300' },
                    { id: 17, title: 'Robohnya Surau Kami', author: 'A.A. Navis', cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AIB_dHuMB2KEZyTuJTi9Zso1LdYL1YQLIQ&s' },
                    { id: 18, title: 'Sabtu Bersama Bapak', author: 'Adhitya Mulya', cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLVGXuoX__fpVGZ8UTYVEsEZxW7odss5Gmw&s' },
                ];

                const borrowersData = borrowersRes.data.length > 0 ? borrowersRes.data : [
                    { id: 1, name: 'Husein', class: 'XI-A' },
                    { id: 2, name: 'Ahmad Fauzi', class: 'XI-B' },
                    { id: 3, name: 'Siti Aminah', class: 'XI-C' },
                    { id: 4, name: 'Budi Santoso', class: 'XI-D' },
                    { id: 5, name: 'Rina Kartika', class: 'XI-E' },
                    { id: 6, name: 'Andi Wijaya', class: 'XI-F' },
                ];

                setBooks(booksData);
                setBorrowers(borrowersData);
            } catch (error) {
                console.error("Failed to fetch data", error);
                // Fallback for demo
                setBooks([
                    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300' },
                    { id: 2, title: 'Bumi', author: 'Tere Liye', cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300' },
                    { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', cover_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300' },
                    { id: 4, title: 'Negeri 5 Menara', author: 'A. Fuadi', cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300' },
                    { id: 5, title: 'Pulang', author: 'Leila S. Chudori', cover_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300' },
                    { id: 6, title: 'Laut Bercerita', author: 'Leila S. Chudori', cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300' },
                    { id: 7, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', cover_image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=300' },
                    { id: 8, title: 'Ronggeng Dukuh Paruk', author: 'Ahmad Tohari', cover_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300' },
                    { id: 9, title: 'Perahu Kertas', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300' },
                    { id: 10, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', cover_image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPSq3QdC1P3W_lIZSTtAtEulUTL5wplJ9XFy3-CS2BFJAreyqSNNiVP0OPgGwk418-Z13L3gqwnY8oWiBfE0VNkFXBnzsbpN5GBEE4LEwX9AQYVvIceZgJjA7Be8Q1q0F_HUJTgaidEqwSBp70KvHVYuHpUBS1vuFIDt6FkaCKDc8nVviuEyqub6th/w800/1656902167.png' },
                    { id: 11, title: 'Dilan 1990', author: 'Pidi Baiq', cover_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=300' },
                    { id: 12, title: 'Supernova', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300' },
                    { id: 13, title: 'Hujan', author: 'Tere Liye', cover_image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300' },
                    { id: 14, title: 'Sang Pemimpi', author: 'Andrea Hirata', cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300' },
                    { id: 15, title: 'Garis Waktu', author: 'Fiersa Besari', cover_image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=300' },
                    { id: 16, title: 'Madre', author: 'Dee Lestari', cover_image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=300' },
                    { id: 17, title: 'Robohnya Surau Kami', author: 'A.A. Navis', cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AIB_dHuMB2KEZyTuJTi9Zso1LdYL1YQLIQ&s' },
                    { id: 18, title: 'Sabtu Bersama Bapak', author: 'Adhitya Mulya', cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLVGXuoX__fpVGZ8UTYVEsEZxW7odss5Gmw&s' },
                ]);
                setBorrowers([
                    { id: 1, name: 'Husein', class: 'XI-A' },
                    { id: 2, name: 'Ahmad Fauzi', class: 'XI-B' },
                    { id: 3, name: 'Siti Aminah', class: 'XI-C' },
                    { id: 4, name: 'Budi Santoso', class: 'XI-D' },
                    { id: 5, name: 'Rina Kartika', class: 'XI-E' },
                    { id: 6, name: 'Andi Wijaya', class: 'XI-F' },
                ]);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Map borrower_id to user_id for the backend
        const payload = {
            ...formData,
            user_id: formData.borrower_id
        };

        try {
            await createTransaction(payload);
            alert('Transaksi Peminjaman berhasil disimpan ke database!');
            navigate('/app/transaksi');
        } catch (error) {
            console.error("Failed to create transaction", error);

            // FALLBACK FOR DEMO: Save to localStorage if server is offline
            const selectedBook = books.find(b => b.id.toString() === formData.book_id.toString());
            const newTx = {
                id: Date.now(),
                borrower_name: user?.name || 'Husein',
                user_id: user?.id || 1, // Store user ID for filtering
                book_title: selectedBook?.title || 'Buku Pilihan',
                cover_image: selectedBook?.cover_image || '',
                borrow_date: formData.borrow_date,
                due_date: formData.due_date,
                status: 'Dipinjam'
            };

            const existing = JSON.parse(localStorage.getItem('demo_transactions') || '[]');
            localStorage.setItem('demo_transactions', JSON.stringify([newTx, ...existing]));

            alert('Transaksi Peminjaman berhasil dicatat!');
            navigate('/app/transaksi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem' }}>Tambah Pinjaman Baru</h1>
                <p style={{ color: 'var(--text-muted)' }}>Isi formulir di bawah untuk mencatat peminjaman buku.</p>
            </header>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                            Peminjam
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            {user && user.role !== 'admin' ? (
                                <input
                                    type="text"
                                    className="input"
                                    value={user.name}
                                    readOnly
                                    style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#f8fafc', color: '#64748b' }}
                                />
                            ) : (
                                <select
                                    required
                                    className="input"
                                    value={formData.borrower_id}
                                    onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
                                    style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                                >
                                    <option value="">Pilih Peminjam...</option>
                                    {borrowers.map(b => <option key={b.id} value={b.id}>{b.name} ({b.class})</option>)}
                                </select>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '100px',
                            height: '140px',
                            borderRadius: '12px',
                            background: '#f1f5f9',
                            flexShrink: 0,
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={getImageUrl(books.find(b => b.id.toString() === formData.book_id.toString())?.cover_image)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300'}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                Buku yang Dipinjam
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Book size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <select
                                    required
                                    className="input"
                                    value={formData.book_id}
                                    onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                                    style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                                >
                                    <option value="">Pilih Buku...</option>
                                    {books.map(b => <option key={b.id} value={b.id}>{b.title} - {b.author}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                Tanggal Pinjam
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="date"
                                    required
                                    value={formData.borrow_date}
                                    onChange={(e) => setFormData({ ...formData, borrow_date: e.target.value })}
                                    style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                                Tenggat Kembali
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="date"
                                    required
                                    value={formData.due_date}
                                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                    style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => navigate(-1)}
                        >
                            <X size={18} /> Batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <Save size={18} /> {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;
