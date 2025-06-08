"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout, loading } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <header className="header">
                <div className="header-content">
                    <Link href="/">My Auth App</Link>
                    <nav className="nav">
                        <span>Loading...</span>
                    </nav>
                </div>
            </header>
        );
    }

    return (
        <header className="header">
            <div className="header-content">
                <Link href="/">My Auth App</Link>
                <nav className="nav">
                    {user ? (
                        <>
                            <span>Welcome, {user.name}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
