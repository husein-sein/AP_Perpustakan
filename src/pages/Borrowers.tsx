import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Mail, Phone } from 'lucide-react';

const Borrowers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const borrowers = [
        { id: 1, name: 'Husein', email: 'husein@sekolah.sch.id', phone: '08123456789', class: 'XI-A' },
        { id: 2, name: 'Ahmad Fauzi', email: 'ahmad@sekolah.sch.id', phone: '08129876543', class: 'XI-B' },
        { id: 3, name: 'Siti Aminah', email: 'siti@sekolah.sch.id', phone: '08121111111', class: 'XI-C' },
        { id: 4, name: 'Budi Santoso', email: 'budi@sekolah.sch.id', phone: '08987654321', class: 'XI-D' },
        { id: 5, name: 'Rina Kartika', email: 'rina@sekolah.sch.id', phone: '08556677889', class: 'XI-E' },
        { id: 6, name: 'Andi Wijaya', email: 'andi@sekolah.sch.id', phone: '08778899001', class: 'XI-F' },
    ];

    return (
        <div>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem' }}>Manajemen Peminjam</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Kelola data anggota perpustakaan.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} />
                    Tambah Peminjam
                </button>
            </header>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search
                            size={18}
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                        />
                        <input
                            type="text"
                            placeholder="Cari peminjam berdasarkan nama atau kelas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.625rem 1rem 0.625rem 2.5rem',
                                borderRadius: '6px',
                                border: '1px solid var(--border-color)',
                                outline: 'none',
                                fontSize: '0.875rem'
                            }}
                        />
                    </div>
                </div>

                <div className="table-container" style={{ border: 'none', borderRadius: '0 0 8px 8px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Kontak</th>
                                <th>Kelas</th>
                                <th style={{ textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowers.map((borrower) => (
                                <tr key={borrower.id}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{borrower.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: MEM-{borrower.id.toString().padStart(4, '0')}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                                            <Mail size={14} className="text-muted" /> {borrower.email}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
                                            <Phone size={14} className="text-muted" /> {borrower.phone}
                                        </div>
                                    </td>
                                    <td>{borrower.class}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem' }}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger)' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Borrowers;
