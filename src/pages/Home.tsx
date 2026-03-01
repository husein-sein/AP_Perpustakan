import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Star } from 'lucide-react';
import { getBooks } from '../services/api';

const getImageUrl = (image: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/uploads/${image}`;
};

const Home = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('Semua');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks({ origin: 'Indonesia' });
                if (response.data.length > 0) {
                    setBooks(response.data);
                } else {
                    throw new Error("No data");
                }
            } catch (error) {
                console.error("Failed to fetch books", error);
                setBooks([
                    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Fiksi', stock: 5, cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300' },
                    { id: 2, title: 'Bumi', author: 'Tere Liye', category: 'Fiksi', stock: 3, cover_image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300' },
                    { id: 3, title: 'Filosofi Teras', author: 'Henry Manampiring', category: 'Self Improvement', stock: 8, cover_image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300' },
                    { id: 4, title: 'Negeri 5 Menara', author: 'A. Fuadi', category: 'Fiksi', stock: 4, cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300' },
                    { id: 5, title: 'Pulang', author: 'Leila S. Chudori', category: 'Sejarah', stock: 2, cover_image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=300' },
                    { id: 6, title: 'Laut Bercerita', author: 'Leila S. Chudori', category: 'Fiksi', stock: 6, cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300' },
                    { id: 7, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', category: 'Fiksi', stock: 3, cover_image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=300' },
                    { id: 8, title: 'Ronggeng Dukuh Paruk', author: 'Ahmad Tohari', category: 'Sejarah', stock: 5, cover_image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300' },
                    { id: 9, title: 'Perahu Kertas', author: 'Dee Lestari', category: 'Fiksi', stock: 7, cover_image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300' },
                    { id: 10, title: 'Ayat-Ayat Cinta', author: 'Habiburrahman El Shirazy', category: 'Fiksi', stock: 9, cover_image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPSq3QdC1P3W_lIZSTtAtEulUTL5wplJ9XFy3-CS2BFJAreyqSNNiVP0OPgGwk418-Z13L3gqwnY8oWiBfE0VNkFXBnzsbpN5GBEE4LEwX9AQYVvIceZgJjA7Be8Q1q0F_HUJTgaidEqwSBp70KvHVYuHpUBS1vuFIDt6FkaCKDc8nVviuEyqub6th/w800/1656902167.png' },
                    { id: 11, title: 'Dilan 1990', author: 'Pidi Baiq', category: 'Fiksi', stock: 12, cover_image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=300' },
                    { id: 12, title: 'Supernova', author: 'Dee Lestari', category: 'Sains', stock: 4, cover_image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300' },
                    { id: 13, title: 'Hujan', author: 'Tere Liye', category: 'Sains', stock: 6, cover_image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=300' },
                    { id: 14, title: 'Sang Pemimpi', author: 'Andrea Hirata', category: 'Fiksi', stock: 8, cover_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=300' },
                    { id: 15, title: 'Garis Waktu', author: 'Fiersa Besari', category: 'Self Improvement', stock: 5, cover_image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=300' },
                    { id: 16, title: 'Madre', author: 'Dee Lestari', category: 'Fiksi', stock: 3, cover_image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=300' },
                    { id: 17, title: 'Robohnya Surau Kami', author: 'A.A. Navis', category: 'Sejarah', stock: 2, cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AIB_dHuMB2KEZyTuJTi9Zso1LdYL1YQLIQ&s' },
                    { id: 18, title: 'Sabtu Bersama Bapak', author: 'Adhitya Mulya', category: 'Fiksi', stock: 7, cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLVGXuoX__fpVGZ8UTYVEsEZxW7odss5Gmw&s' },
                ]);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = genre === 'Semua' || book.category === genre;
        return matchesSearch && matchesGenre;
    });

    const featuredBook = books[0] || {
        id: 1,
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        category: 'Fiksi',
        stock: 5,
        cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000'
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            {/* Featured Recommendation */}
            <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                borderRadius: '24px',
                padding: '2.5rem',
                marginBottom: '3rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: '500px', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginBottom: '1rem' }}>
                        <Star size={16} fill="#fbbf24" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase' }}>Rekomendasi Minggu Ini</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', color: 'white' }}>{featuredBook.title}</h2>
                    <p style={{ fontSize: '1.125rem', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>
                        {featuredBook.title === 'Laskar Pelangi'
                            ? 'Kisah perjuangan sepuluh anak di Belitung demi mendapatkan pendidikan yang layak.'
                            : `Karya terbaik dari ${featuredBook.author} dalam kategori ${featuredBook.category}.`}
                    </p>
                    <button
                        className="btn"
                        style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '0.875rem 2rem' }}
                        onClick={() => navigate('/app/transaksi/baru', { state: { bookId: featuredBook.id, bookTitle: featuredBook.title, bookCover: featuredBook.cover_image } })}
                    >
                        Pinjam Sekarang
                    </button>
                </div>
                <div style={{
                    width: '200px',
                    height: '280px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    transform: 'rotate(6deg)',
                    zIndex: 1
                }}>
                    <img
                        src={getImageUrl(featuredBook.cover_image)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt={featuredBook.title}
                        onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300'}
                    />
                </div>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                background: 'white',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9'
            }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Eksplorasi Koleksi</h2>
                    <p style={{ color: '#64748b', fontSize: '0.8125rem', margin: '2px 0 0' }}>Temukan buku terbaik dari penulis Indonesia</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            className="input"
                            placeholder="Cari buku atau pengarang..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '0.625rem 1rem 0.625rem 2.75rem',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                width: '280px',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Filter size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                        <select
                            className="input"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            style={{
                                padding: '0.625rem 2rem 0.625rem 2.25rem',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                minWidth: '150px',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                appearance: 'none',
                                color: '#475569'
                            }}
                        >
                            <option value="Semua">Semua Genre</option>
                            <option value="Fiksi">Fiksi</option>
                            <option value="Sejarah">Sejarah</option>
                            <option value="Sains">Sains</option>
                            <option value="Self Improvement">Self Improvement</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* List View - Row style as requested */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '1rem'
            }}>
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        style={{
                            background: '#f8fafc',
                            padding: '12px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s ease',
                            cursor: 'default'
                        }}
                    >
                        {/* Square Thumbnail */}
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: '#cbd5e1'
                        }}>
                            <img
                                src={getImageUrl(book.cover_image)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt={book.title}
                                onError={(e: any) => e.target.src = 'https://images.unsplash.com/photo-1543004218-ee141d055c5e?q=80&w=300'}
                            />
                        </div>

                        {/* Content Right */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {book.title}
                                </h3>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '4px 12px', fontSize: '0.7rem', borderRadius: '8px' }}
                                    onClick={() => navigate('/app/transaksi/baru', { state: { bookId: book.id, bookTitle: book.title, bookCover: book.cover_image } })}
                                    disabled={book.stock === 0}
                                >
                                    Pilih
                                </button>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '2px 0 6px' }}>{book.author}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px', background: 'white', border: '1px solid #e2e8f0', color: '#475569' }}>
                                        {book.category}
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: book.stock > 0 ? '#16a34a' : '#ef4444' }}>
                                    {book.stock > 0 ? `Stok: ${book.stock}` : 'Habis'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
