import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { validateCredentials } from "@/lib/mockData";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = validateCredentials(email, password);
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = signToken({
            userId: user.email,
            name: user.name,
        });

        // create response
        const response = NextResponse.json(
            {
                message: "Login successful",
                user: { name: user.name, email: user.email },
            },
            { status: 200 }
        );

        // set HttpOnly cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Login failed" }, { status: 500 });
    }
}
