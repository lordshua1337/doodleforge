import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth/server";
import { adminClient } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;
    const scope = searchParams.get("scope"); // "user" for personal, "community" for public gallery

    if (scope === "community") {
      // Public endpoint: recent completed forges for gallery
      // Note: no original_url or user data exposed publicly (COPPA)
      const { data: forges, error } = await adminClient
        .from("forges")
        .select(`
          id,
          style,
          is_epic,
          result_url,
          created_at
        `)
        .eq("status", "complete")
        .not("result_url", "is", null)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ forges: forges ?? [], page, limit });
    }

    // Personal endpoint: user's own forge history
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in to view forge history" }, { status: 401 });
    }

    const { data: forges, error } = await adminClient
      .from("forges")
      .select(`
        id,
        style,
        is_epic,
        result_url,
        status,
        generation_time_ms,
        created_at,
        drawings (
          id,
          original_url,
          file_name
        ),
        children (
          name,
          age
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get total count for pagination
    const { count } = await adminClient
      .from("forges")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    return NextResponse.json({
      forges: forges ?? [],
      page,
      limit,
      total: count ?? 0,
    });
  } catch (error) {
    console.error("Forges API error:", error);
    return NextResponse.json({ error: "Failed to fetch forges" }, { status: 500 });
  }
}
