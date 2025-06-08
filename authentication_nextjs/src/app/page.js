"use client";

import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="home">
            <h1>Welcome to Next.js Auth App</h1>

            {user ? (
                <div className="welcome-message">
                    <h2>Welcome back, {user.name}! 🎉</h2>
                    <p>You are successfully logged in.</p>
                    <p>
                        Your authentication is working with JWT and HttpOnly
                        cookies!
                    </p>
                </div>
            ) : (
                <div className="login-prompt">
                    <h2>Please log in 🔐</h2>
                    <p>You need to log in to access protected content.</p>
                    <p>
                        Use the navigation above to register a new account or
                        log in.
                    </p>
                </div>
            )}

            {/* <div className="features">
                <h3>Features Demonstrated:</h3>
                <ul>
                    <li>✅ JWT Authentication</li>
                    <li>✅ HttpOnly Cookies</li>
                    <li>✅ React Context State</li>
                    <li>✅ Protected Routes</li>
                    <li>✅ Persistent Login</li>
                </ul>
            </div> */}
        </div>
    );
}
