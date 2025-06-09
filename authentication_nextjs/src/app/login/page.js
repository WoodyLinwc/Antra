"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Login successful, redirect to home
            router.push("/");
        } else {
            setError(result.error || "Login failed");
        }

        setLoading(false);
    };

    return (
        <div className="form-container">
            <h1>Login</h1>

            {error && <div>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Signing In..." : "Login"}
                </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Don't have an account?{" "}
                <a href="/register" style={{ color: "#0066cc" }}>
                    Register here
                </a>
            </p>

            <div>
                <h3>Demo Credentials:</h3>
                <p>
                    <strong>Email:</strong> test@example.com
                </p>
                <p>
                    <strong>Password:</strong> test123
                </p>
            </div>
        </div>
    );
}
