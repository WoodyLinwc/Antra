import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findUserByEmail } from "@/lib/mockData";

export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "No token found" },
                { status: 401 }
            );
        }

        // verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        const user = findUserByEmail(decoded.userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // return user info
        return NextResponse.json(
            {
                name: user.name,
                email: user.email,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Authentication failed" },
            { status: 500 }
        );
    }
}
