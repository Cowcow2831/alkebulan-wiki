---
access_level: secret
---

# Wiki Formatting Template & Reference

This document explains how to format content for your Jekyll-based D&D wiki with multi-view access control. Use this as a template for new pages and as a reference for Claude when generating content.

## Frontmatter (Required at top of every .md file)

```yaml
---
access_level: public  # Options: public, player, dm, secret
type: ["location", "npc", "quest"]  # Optional categories
---
```

### Access Levels Explained:

- **`public`** - Visible to everyone, no restrictions
- **`player`** - Safe for players to read, may show DM content with warnings in DM view
- **`dm`** - Only visible in DM view, shows classified banner in player view
- **`secret`** - Completely hidden from all views (for your private notes)

## Content Formatting System

### 1. DM-Only Content Blocks

Use these HTML comments to wrap content that should only appear in DM view:

```markdown
<!-- DM_START -->
**DM Secret:** The mayor is actually a doppelganger working for the BBEG. 

The real mayor is imprisoned in the basement of the town hall. Players can find clues:
- Strange behavior changes started 3 months ago
- The mayor's handwriting is slightly different on recent documents
- A detect magic spell reveals faint illusion magic around him
<!-- DM_END -->
```

### 2. Player-Safe Content Blocks

Use these to explicitly mark content as safe for players (useful for organization):

```markdown
<!-- PLAYER_SAFE_START -->
The town of Port Zephyr sits on the edge of the Whispering Bay, its lighthouse serving as a beacon for ships navigating the treacherous waters. The town is governed by Mayor Aldric Brennan, a respected figure who has led the community for over a decade.
<!-- PLAYER_SAFE_END -->
```

### 3. Mixed Content Pages

You can freely mix player-safe and DM-only content:

```markdown
# The Rusty Anchor Tavern

<!-- PLAYER_SAFE_START -->
A popular establishment in Port Zephyr's harbor district, known for its strong ale and stronger stories. The tavern is run by Mira Saltwind, a former sailor with an impressive collection of nautical tattoos.

## Common Room
The main floor features sturdy wooden tables, a large fireplace, and walls decorated with maritime artifacts. Local fishermen and visiting merchants gather here nightly.
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
**DM Note:** Mira is actually an informant for the Thieves' Guild. She reports on wealthy visitors and cargo manifests.

**Secret Room:** Behind the wine cellar is a hidden chamber where stolen goods are temporarily stored. DC 15 Investigation to find the hidden door.

**Quest Hook:** If players befriend Mira, she might warn them about planned heists or ask for help with guild problems.
<!-- DM_END -->

## Menu & Prices

<!-- PLAYER_SAFE_START -->
- Ale: 2 copper pieces
- Hot meal: 5 copper pieces  
- Room for the night: 2 silver pieces
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
**Poison Option:** For 10 gold, Mira can slip sleeping poison into someone's drink (Contact Poison, DC 13 CON save or fall unconscious for 1 hour).
<!-- DM_END -->
```

## Wiki Link Format

Use double brackets for internal links:

```markdown
[[Port Zephyr]] - Links to the Port Zephyr page
[[Port Zephyr|the harbor town]] - Links to Port Zephyr but displays as "the harbor town"
[[Harbor District]] - Links to Harbor District page
```

## Content Guidelines for Claude

When Claude generates content for this wiki, follow these rules:

### 1. Always Include Frontmatter
Every page needs proper frontmatter with type and access_level.

### 2. Access Level Selection
- Use `public` for basic world information, general locations, common knowledge
- Use `player` for detailed locations, NPCs players should know about, quest information
- Use `dm` for secret locations, villain information, detailed stat blocks, treasure locations
- Use `secret` for notes not meant for any public view

### 3. Content Structure
- Start with player-safe information when possible
- Use DM blocks for secrets, stats, behind-the-scenes information
- Include specific game mechanics (DCs, stats, treasure) in DM sections
- Always provide both player and DM perspectives for important content

### 4. Link Everything
Use wiki links `[[Page Name]]` to connect related content. Link to:
- Locations mentioned in other locations
- NPCs mentioned in quests or locations  
- Related quests or plot hooks
- Parent locations (link districts to cities, cities to regions)

### 5. Be Specific in DM Sections
Include:
- Exact stat blocks or references to Monster Manual entries
- Specific DCs for skill checks
- Exact treasure amounts and magic items
- Plot hooks and consequences for player actions
- NPC motivations and secrets