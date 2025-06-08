import { NextResponse } from "next/server";
import { createUser } from "@/lib/mockData";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const user = createUser(name, email, password);

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: { name: user.name, email: user.email },
            },
            { status: 201 }
        );
    } catch (error) {
        if (error.message === "User already exists") {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Registration failed" },
            { status: 500 }
        );
    }
}
