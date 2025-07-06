import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function DELETE(req, { params }) {
  await connectToDB();

  const { id } = params;

  try {
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
export async function PATCH(req, { params }) {
  await connectToDB();
  const { id } = params;
  const body = await req.json();
  const { description, amount, date } = body;

  try {
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { description, amount, date },
      { new: true } 
    );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}


