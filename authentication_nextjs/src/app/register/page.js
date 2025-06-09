"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register } = useAuth();
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

        const result = await register(
            formData.name,
            formData.email,
            formData.password
        );

        if (result.success) {
            // registration successful, redirect to login
            router.push("/login");
        } else {
            setError(result.error || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <div className="form-container">
            <h1>Register</h1>

            {error && <div>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

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
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: "#0066cc" }}>
                    Login here
                </a>
            </p>
        </div>
    );
}
