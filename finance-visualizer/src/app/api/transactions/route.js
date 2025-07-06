import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req) {
  await connectToDB();

  try {
    const body = await req.json();
    const { description, amount, date, category } = body;

    // Validate all required fields
    if (!description || !amount || !date || !category) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create and save the transaction
    const transaction = await Transaction.create({
      description,
      amount,
      date,
      category, // ✅ this is the critical line
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    console.error("Error creating transaction:", err);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
