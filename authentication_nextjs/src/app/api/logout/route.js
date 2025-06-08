import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        // clear the cookie by setting with Max-Age=0
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // this expires the cookie immediately
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}
