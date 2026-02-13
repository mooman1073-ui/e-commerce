import { NextRequest, NextResponse } from "next/server";

/* ================= DELETE PRODUCT ================= */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await context.params;

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}

/* ================= UPDATE COUNT ================= */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await context.params;
    const { count } = await req.json();

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ count }),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
