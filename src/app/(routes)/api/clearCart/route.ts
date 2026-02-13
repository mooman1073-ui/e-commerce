import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/cart`, {
      method: "DELETE",
      headers: {
        token,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Server error",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
