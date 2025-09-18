import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// replace with your bot token and server ID
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const SERVER_ID = "1399320457018212484";

app.get("/members", async (req, res) => {
  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${SERVER_ID}?with_counts=true`, {
      headers: {
        "Authorization": `Bot ${BOT_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch guild data");
    }

    const data = await response.json();
    res.json({
      totalMembers: data.approximate_member_count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));