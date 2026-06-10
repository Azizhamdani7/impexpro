import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/submissions";

export async function GET() {
  return NextResponse.json({ submissions: await getSubmissions() });
}
