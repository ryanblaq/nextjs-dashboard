import { NextResponse } from "next/server";
import { signOut } from "@/auth";

export async function POST() {
  await signOut({ redirectTo: "/" });
  return NextResponse.json({ ok: true });
}