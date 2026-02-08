import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2, X } from 'lucide-react';
import { getBooks, createBook } from '../services/api';

const getImageUrl = (image: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
};

const Books = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '', author: '', isbn: '', category: 'Fiksi', year_published: new Date().getFullYear(), stock: 0
    });
    const [cover, setCover] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchBooks = async () => {
        try {
            const res = await getBooks();
            if (res.data.length > 0) {
                setBooks(res.data);
            } else {
                // Fallback for demo
                setBooks([
                    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Fiksi', isbn: '978-979-3062-79-1', year_published: 2005, stock: 5, cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000' },
                    { id: 2, title: 'Bumi', author: 'Tere Liye', category: 'Fiksi', isbn: '978-602-03-3295-6', year_published: 2014, stock: 3, cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000' },
                    { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', category: 'Self Improvement', isbn: '978-602-412-518-9', year_published: 2018, stock: 8, cover_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000' },
                    { id: 4, title: 'Negeri 5 Menara', author: 'A. Fuadi', category: 'Fiksi', isbn: '978-979-22-4845-6', year_published: 2009, stock: 4, cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000' },
                    { id: 5, title: 'Pulang', author: 'Leila S. Chudori', category: 'Sejarah', isbn: '978-979-91-0515-8', year_published: 2012, stock: 2, cover_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000' },
                    { id: 6, title: 'Laut Bercerita', author: 'Leila S. Chudori', category: 'Fiksi', isbn: '978-602-424-693-8', year_published: 2017, stock: 6, cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000' },
                    { id: 7, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', category: 'Fiksi', isbn: '978-602-03-1258-3', year_published: 2002, stock: 3, cover_image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=1000' },
                    { id: 8, title: 'Ronggeng Dukuh Paruk', author: 'Ahmad Tohari', category: 'Sejarah', isbn: '978-979-22-0196-3', year_published: 1982, stock: 5, cover_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000' },
                    { id: 9, title: 'Perahu Kertas', author: 'Dee Lestari', category: 'Fiksi', isbn: '978-979-1227-78-0', year_published: 2009, stock: 7, cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300' },
                    { id: 10, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', category: 'Fiksi', isbn: '978-979-3604-02-2', year_published: 2004, stock: 9, cover_image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPSq3QdC1P3W_lIZSTtAtEulUTL5wplJ9XFy3-CS2BFJAreyqSNNiVP0OPgGwk418-Z13L3gqwnY8oWiBfE0VNkFXBnzsbpN5GBEE4LEwX9AQYVvIceZgJjA7Be8Q1q0F_HUJTgaidEqwSBp70KvHVYuHpUBS1vuFIDt6FkaCKDc8nVviuEyqub6th/w800/1656902167.png' },
                    { id: 11, title: 'Dilan 1990', author: 'Pidi Baiq', category: 'Fiksi', isbn: '978-602-7870-41-3', year_published: 2014, stock: 12, cover_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=300' },
                    { id: 12, title: 'Supernova', author: 'Dee Lestari', category: 'Sains', isbn: '978-979-96257-0-0', year_published: 2001, stock: 4, cover_image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300' },
                    { id: 13, title: 'Hujan', author: 'Tere Liye', category: 'Sains', isbn: '978-602-03-2478-4', year_published: 2016, stock: 6, cover_image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300' },
                    { id: 14, title: 'Sang Pemimpi', author: 'Andrea Hirata', category: 'Fiksi', isbn: '978-979-3062-92-0', year_published: 2006, stock: 8, cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300' },
                    { id: 15, title: 'Garis Waktu', author: 'Fiersa Besari', category: 'Self Improvement', isbn: '978-979-7945-25-1', year_published: 2016, stock: 5, cover_image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=300' },
                    { id: 16, title: 'Madre', author: 'Dee Lestari', category: 'Fiksi', isbn: '978-602-8811-42-2', year_published: 2011, stock: 3, cover_image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=300' },
                    { id: 17, title: 'Robohnya Surau Kami', author: 'A.A. Navis', category: 'Sejarah', isbn: '978-979-407-285-1', year_published: 1956, stock: 2, cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AIB_dHuMB2KEZyTuJTi9Zso1LdYL1YQLIQ&s' },
                    { id: 18, title: 'Sabtu Bersama Bapak', author: 'Adhitya Mulya', category: 'Fiksi', isbn: '978-602-7870-58-1', year_published: 2014, stock: 7, cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLVGXuoX__fpVGZ8UTYVEsEZxW7odss5Gmw&s' },
                ]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, val]) => data.append(key, val.toString()));
            if (cover) data.append('cover', cover);

            await createBook(data);
            setShowModal(false);
            fetchBooks();
            setFormData({ title: '', author: '', isbn: '', category: 'Fiksi', year_published: new Date().getFullYear(), stock: 0 });
            setCover(null);
        } catch (err) {
            alert('Gagal menambah buku');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem' }}>Manajemen Buku</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Kelola koleksi buku perpustakaan secara profesional.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn btn-primary">
                    <Plus size={18} /> Tambah Buku
                </button>
            </header>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Cari judul, penulis, atau ISBN..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                        />
                    </div>
                </div>

                <div className="table-container" style={{ border: 'none' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Cover</th>
                                <th>Judul & Penulis</th>
                                <th>ISBN</th>
                                <th>Kategori</th>
                                <th>Tahun</th>
                                <th>Stok</th>
                                <th style={{ textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <div style={{ width: '45px', height: '60px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                            <img
                                                src={getImageUrl(book.cover_image)}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300'}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{book.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{book.author}</div>
                                    </td>
                                    <td style={{ fontSize: '0.8125rem' }}>{book.isbn}</td>
                                    <td><span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{book.category}</span></td>
                                    <td>{book.year_published}</td>
                                    <td>{book.stock}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem' }}><Edit2 size={16} /></button>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Tambah Buku Baru</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ gridColumn: 'span 2', marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Judul Buku</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Penulis</label>
                                    <input required value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Kategori</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                                        <option>Fiksi</option><option>Non-Fiksi</option><option>Sains</option><option>Sejarah</option><option>Self Improvement</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Tahun Terbit</label>
                                    <input type="number" value={formData.year_published} onChange={e => setFormData({ ...formData, year_published: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Stok</label>
                                    <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                                </div>
                                <div style={{ gridColumn: 'span 2', marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Cover Image</label>
                                    <input type="file" ref={fileRef} onChange={e => setCover(e.target.files?.[0] || null)} style={{ width: '100%', fontSize: '0.8125rem' }} accept="image/*" />
                                </div>
                            </div>
                            <button disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Simpan Buku'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;
