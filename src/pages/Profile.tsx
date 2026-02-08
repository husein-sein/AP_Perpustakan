import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import { User, Shield, Mail, Camera, Save, Loader2 } from 'lucide-react';

const Profile = () => {
    const { user, login } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(user?.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (photo) formData.append('photo', photo);

            const response = await updateProfile(user.id, formData);
            alert('Profil berhasil diperbaharui!');

            // Update local state
            const token = localStorage.getItem('token');
            if (token) {
                const updatedUser = {
                    ...user,
                    name,
                    profile_image: response.data.profile_image || user.profile_image
                };
                login(token, updatedUser);
            }
        } catch (error) {
            console.error(error);

            // FALLBACK: Demo Mode (Offline Update)
            if (photo) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    const token = localStorage.getItem('token') || 'demo-token';
                    const updatedUser = {
                        ...user,
                        name,
                        profile_image: base64String
                    };
                    login(token, updatedUser);
                    alert('Profil berhasil diperbaharui! (Mode Demo Offline)');
                };
                reader.readAsDataURL(photo);
            } else {
                const token = localStorage.getItem('token') || 'demo-token';
                const updatedUser = {
                    ...user,
                    name
                };
                login(token, updatedUser);
                alert('Nama profil berhasil diperbaharui! (Mode Demo Offline)');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem' }}>Pengaturan Profil</h1>
                <p style={{ color: 'var(--text-muted)' }}>Kelola informasi akun dan foto profil Anda.</p>
            </header>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                border: '4px solid white',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}>
                                {preview ? (
                                    <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <User size={64} color="var(--primary)" />
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>
                        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maksimum ukuran foto 2MB</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Nama Lengkap</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '0.625rem 1rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email (Tidak dapat diubah)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <Mail size={16} />
                                <span>{user?.email}</span>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Peran / Role</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <Shield size={16} />
                                <span style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
