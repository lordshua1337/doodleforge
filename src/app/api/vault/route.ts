import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { adminClient } from "@/lib/supabase/client";

export async function GET() {
  try {
    const user = await requireUser();

    const { data: entries, error } = await adminClient
      .from("vault_entries")
      .select(`
        id,
        title,
        note,
        display_order,
        created_at,
        forge_id,
        forges (
          id,
          style,
          is_epic,
          result_url,
          created_at,
          drawings (
            original_url,
            file_name
          )
        )
      `)
      .eq("user_id", user.id)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entries: entries ?? [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to view vault" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();

    const forgeId = typeof body.forge_id === "string" ? body.forge_id : null;
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 200) : "Untitled";

    // Check for duplicate if forge_id is provided
    if (forgeId) {
      const { data: existing } = await adminClient
        .from("vault_entries")
        .select("id")
        .eq("user_id", user.id)
        .eq("forge_id", forgeId)
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json({ error: "Already in vault" }, { status: 409 });
      }
    }

    const { data: entry, error } = await adminClient
      .from("vault_entries")
      .insert({
        user_id: user.id,
        forge_id: forgeId, // null for legacy localStorage-migrated entries
        title,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to save to vault" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get("id");

    if (!entryId) {
      return NextResponse.json({ error: "Entry ID required" }, { status: 400 });
    }

    const { error } = await adminClient
      .from("vault_entries")
      .delete()
      .eq("id", entryId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to manage vault" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const entryId = typeof body.id === "string" ? body.id : null;

    if (!entryId) {
      return NextResponse.json({ error: "Entry ID required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (typeof body.title === "string") updates.title = body.title.trim().slice(0, 200);
    if (typeof body.note === "string") updates.note = body.note.trim().slice(0, 1000);
    if (typeof body.display_order === "number") updates.display_order = body.display_order;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const { data: entry, error } = await adminClient
      .from("vault_entries")
      .update(updates)
      .eq("id", entryId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: "Sign in to manage vault" }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
