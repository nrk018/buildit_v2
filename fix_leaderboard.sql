-- Fix leaderboard_teams table for BuildIt application
-- Run this SQL in your Supabase SQL editor

-- 1. Drop the table if it exists (to start fresh)
DROP TABLE IF EXISTS leaderboard_teams CASCADE;

-- 2. Create the leaderboard_teams table with correct structure
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

-- 3. Create indexes for better performance
CREATE INDEX idx_leaderboard_teams_team ON leaderboard_teams("teamName");
CREATE INDEX idx_leaderboard_teams_points ON leaderboard_teams(points);
CREATE INDEX idx_leaderboard_teams_rank ON leaderboard_teams(rank);

-- 4. Create the update_team_ranks function
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

-- 5. Insert some sample data to test
INSERT INTO leaderboard_teams ("teamName", points, domain, project, rank) VALUES
('Team Alpha', 100, 'AI/ML', 'Project A', 1),
('Team Beta', 85, 'Web Dev', 'Project B', 2),
('Team Gamma', 70, 'Mobile', 'Project C', 3);

-- 6. Update ranks for the sample data
SELECT update_team_ranks()`;

-- 7. Verify the table works
SELECT * FROM leaderboard_teams ORDER BY rank;

