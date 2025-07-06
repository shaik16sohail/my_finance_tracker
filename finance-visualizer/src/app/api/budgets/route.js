import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

// GET all budgets
export async function GET() {
  await connectToDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

// POST a new budget
export async function POST(req) {
  await connectToDB();
  const { category, amount, month } = await req.json();

  // Replace if exists (one budget per category per month)
  const updated = await Budget.findOneAndUpdate(
    { category, month },
    { amount },
    { upsert: true, new: true }
  );

  return NextResponse.json(updated, { status: 201 });
}
