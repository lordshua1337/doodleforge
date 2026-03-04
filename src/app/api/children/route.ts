import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { adminClient } from "@/lib/supabase/client";

export async function GET() {
  try {
    const user = await requireUser();

    const { data: children, error } = await adminClient
      .from("children")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ children: children ?? [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to view children" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || name.length > 50) {
      return NextResponse.json({ error: "Name is required (max 50 characters)" }, { status: 400 });
    }

    const age = typeof body.age === "number" && body.age >= 1 && body.age <= 18 ? body.age : null;
    const avatarEmoji = typeof body.avatar_emoji === "string" ? body.avatar_emoji.slice(0, 4) : "P";

    const { data: child, error } = await adminClient
      .from("children")
      .insert({
        user_id: user.id,
        name,
        age,
        avatar_emoji: avatarEmoji,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ child }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to add a child" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
