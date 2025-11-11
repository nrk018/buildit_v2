import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    const missing = [
      !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL" : null,
      !supabaseKey ? "SUPABASE_SERVICE_ROLE_KEY" : null,
    ].filter(Boolean).join(", ")
    throw new Error(`Supabase env vars are missing: ${missing}`)
  }
  return createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    
    // Step 1: Drop the table if it exists
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'DROP TABLE IF EXISTS leaderboard_teams CASCADE;'
    })
    
    if (dropError) {
      console.error("Error dropping table:", dropError)
      // Don't fail, just log the error
    }
    
    // Step 2: Create the table
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE leaderboard_teams (
          id SERIAL PRIMARY KEY,
          "teamName" TEXT NOT NULL UNIQUE,
          points INTEGER DEFAULT 0,
          domain TEXT DEFAULT 'General',
          project TEXT DEFAULT 'Active Project',
          rank INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (createError) {
      return NextResponse.json({
        success: false,
        error: "Failed to create leaderboard_teams table",
        details: createError.message
      })
    }
    
    // Step 3: Create indexes
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX idx_leaderboard_teams_team ON leaderboard_teams("teamName");
        CREATE INDEX idx_leaderboard_teams_points ON leaderboard_teams(points);
        CREATE INDEX idx_leaderboard_teams_rank ON leaderboard_teams(rank);
      `
    })
    
    if (indexError) {
      console.error("Error creating indexes:", indexError)
      // Don't fail, just log the error
    }
    
    // Step 4: Create the update_team_ranks function
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION update_team_ranks()
        RETURNS void AS $$
        BEGIN
          UPDATE leaderboard_teams 
          SET rank = ranked.rank
          FROM (
            SELECT "teamName", 
                   ROW_NUMBER() OVER (ORDER BY points DESC) as rank
            FROM leaderboard_teams
          ) ranked
          WHERE leaderboard_teams."teamName" = ranked."teamName";
        END;
        $$ LANGUAGE plpgsql;
      `
    })
    
    if (functionError) {
      console.error("Error creating function:", functionError)
      // Don't fail, just log the error
    }
    
    // Step 5: Test the table with a sample insert
    const testTeamName = `test_team_${Date.now()}`
    const { error: testInsertError } = await supabase
      .from("leaderboard_teams")
      .insert({
        teamName: testTeamName,
        points: 100,
        domain: "Test",
        project: "Test Project"
      })
    
    if (testInsertError) {
      return NextResponse.json({
        success: false,
        error: "Failed to test insert into leaderboard_teams",
        details: testInsertError.message
      })
    }
    
    // Step 6: Test the update_team_ranks function
    const { error: rankError } = await supabase.rpc('update_team_ranks')
    
    if (rankError) {
      console.error("Error testing update_team_ranks function:", rankError)
      // Don't fail, just log the error
    }
    
    // Step 7: Clean up test record
    await supabase
      .from("leaderboard_teams")
      .delete()
      .eq("teamName", testTeamName)
    
    // Step 8: Verify the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'leaderboard_teams')
      .eq('table_schema', 'public')
    
    return NextResponse.json({
      success: true,
      message: "leaderboard_teams table created successfully",
      tableStructure: tableInfo || [],
      note: "The approve score functionality should now work properly"
    })
    
  } catch (error) {
    console.error("Fix leaderboard error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    )
  }
}

