import yahoo_fantasy_api as yfa
import json
from yahoo_oauth import OAuth2

# OAuth setup - replace with your credentials
oauth = OAuth2(None, None, from_file='oauth2.json')

# If oauth2.json doesn’t exist, create it with your credentials
if not oauth.token_is_valid():
    oauth.refresh_access_token()

# Connect to your league (ID: 8000, assuming 2024-2025 season)
game = yfa.Game(oauth, 'nhl', '2024')
league = game.to_league('8000')

# Fetch standings
standings = league.standings()
standings_data = []
for team in standings:
    standings_data.append({
        'team_name': team['name'],
        'wins': team['outcome_totals']['wins'],
        'losses': team['outcome_totals']['losses'],
        'points': team['points_for']
    })

# Fetch recent transactions (e.g., trades)
transactions = league.transactions('add,drop,trade', 10)  # Last 10 transactions
trades_data = []
for trans in transactions:
    if trans['type'] == 'trade':
        trades_data.append({
            'players': [player['name'] for player in trans['players']],
            'timestamp': trans['timestamp']
        })

# Save to JSON files
with open('standings.json', 'w') as f:
    json.dump(standings_data, f, indent=4)
with open('trades.json', 'w') as f:
    json.dump(trades_data, f, indent=4)

print("Data saved to standings.json and trades.json")