import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import header from "../components/Header";

export const metadata = {
    title: "Next.js Auth App",
    description: "Authentication app with JWT and HttpOnly cookies",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
