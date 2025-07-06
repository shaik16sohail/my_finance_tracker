import { connectToDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /api/transactions hit");
    await connectToDB();
    const data = await Budget.find();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/transactions failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    console.log("POST /api/transactions hit");
    await connectToDB();
    const body = await req.json();
    console.log("Received body:", body);

    const result = await Budget.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/transactions failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
