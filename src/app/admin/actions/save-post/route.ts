import { NextRequest, NextResponse } from "next/server";
import { savePostAction } from "@/app/admin/actions";

// Kept as an explicit API endpoint for progressive enhancement / form uploads.
// Server Actions are the primary form handler in this project.
export async function POST(_request: NextRequest) {
  return NextResponse.json({ error: "Use the secure server action form handler." }, { status: 405 });
}
