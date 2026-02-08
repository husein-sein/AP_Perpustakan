import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    ArrowLeftRight,
    Library,
    User as UserIcon,
    LogOut
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { icon: Library, label: 'Katalog Buku', path: '/app', roles: ['admin', 'user'] },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard', roles: ['admin', 'user'] },
        { icon: BookOpen, label: 'Manajemen Buku', path: '/app/buku', roles: ['admin'] },
        { icon: Users, label: 'Manajemen Peminjam', path: '/app/peminjam', roles: ['admin'] },
        { icon: ArrowLeftRight, label: 'Transaksi', path: '/app/transaksi', roles: ['admin', 'user'] },
        { icon: UserIcon, label: 'Profile Saya', path: '/app/profile', roles: ['admin', 'user'] },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role || ''));

    // Handle profile image URL
    const getProfilePic = () => {
        if (!user?.profile_image || imgError) return null;
        if (user.profile_image.startsWith('http') || user.profile_image.startsWith('data:')) return user.profile_image;
        return `http://127.0.0.1:5000/uploads/${user.profile_image}`;
    };

    return (
        <div className="sidebar">
            {/* Logo Section */}
            <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '8px', color: 'white' }}>
                    <Library size={24} />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1e293b' }}>perpustakaan</span>
            </div>

            {/* Profile Section */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    border: '1px solid #dbeafe',
                    overflow: 'hidden'
                }}>
                    {getProfilePic() ? (
                        <img
                            src={getProfilePic()!}
                            alt={user?.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        user?.name?.charAt(0) || 'U'
                    )}
                </div>
                <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1e293b' }}>{user?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, textTransform: 'capitalize' }}>{user?.role}</p>
                </div>
            </div>

            <nav style={{ padding: '1rem', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {filteredItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/app'}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 500,
                                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                                })}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={18} />
                    Keluar Sesi
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
