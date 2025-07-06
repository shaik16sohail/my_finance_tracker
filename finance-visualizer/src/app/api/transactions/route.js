import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

// GET: Fetch all transactions
export async function GET() {
  try {
    console.log("✅ [GET] /api/transactions called");
    await connectToDB();

    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("❌ [GET] /api/transactions error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Add a new transaction
export async function POST(req) {
  try {
    console.log("✅ [POST] /api/transactions called");
    await connectToDB();

    const body = await req.json();
    console.log("📦 POST body:", body);

    const transaction = await Transaction.create(body);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("❌ [POST] /api/transactions error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
