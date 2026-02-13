import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get token from request headers
    const token = request.headers.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
  "https://ecommerce.routemisr.com/api/v2/cart",
      
      {
      method: "GET",
      headers: {
        token, 
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch cart" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
