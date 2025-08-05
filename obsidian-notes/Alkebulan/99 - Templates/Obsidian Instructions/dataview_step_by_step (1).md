---
access_level: secret
---

# Step-by-Step Dataview Implementation Guide
*Learning to use Dataview for NPC consistency in your post-nuclear D&D world*

---

## Phase 1: Installing and Setting Up Dataview

### Step 1: Install the Plugin
1. **Open Obsidian Settings** (gear icon or Ctrl+,)
2. **Navigate to Community Plugins**
3. **Search for "Dataview"** by blacksmithgu
4. **Install and Enable** the plugin
5. **Restart Obsidian** (recommended)

### Step 2: Enable Dataview Features
1. **Go to Settings > Dataview**
2. **Enable these critical settings:**
   - ✅ Enable JavaScript Queries
   - ✅ Enable Inline Queries  
   - ✅ Enable DataviewJS
   - Set Refresh Interval to "On file change"

---

## Phase 2: Understanding Dataview Query Structure

### Basic Query Anatomy
Every Dataview query follows this pattern:
```markdown
```dataview
[QUERY TYPE] [FIELDS TO SHOW]
FROM [SOURCE CRITERIA]
WHERE [FILTER CONDITIONS]
GROUP BY [GROUPING FIELD] 
SORT [SORTING CRITERIA]
LIMIT [NUMBER OF RESULTS]
```
```

### Query Types Explained

**LIST** - Simple bullet point list
```markdown
```dataview
LIST
FROM #npc
```
```

**TABLE** - Structured data in columns
```markdown
```dataview
TABLE faction, location, status
FROM #npc
```
```

**TASK** - Shows tasks/checkboxes
```markdown
```dataview
TASK
FROM #npc
WHERE !completed
```
```

---

## Phase 3: Creating Your First NPC Template

### Step 1: Create the Template Structure
Based on your wiki formatting requirements, here's the proper NPC template:

```yaml
---
access_level: player  # or dm/secret as needed
type: npc
name: "Character Full Name"
location: "[[Location Name]]"
faction: "[[Faction Name]]"
status: active  # active, inactive, deceased, unknown
importance: major  # major, minor, background
remnant-exposure: low  # none, low, moderate, high, critical
attitude-party: neutral  # friendly, neutral, hostile, unknown
last-updated: 2024-01-15
tags:
  - npc
  - port-zephyr  # location tag
  - merchant     # role/theme tag
---
```

### Step 2: Understanding Frontmatter Fields
Each field serves a specific purpose:

- **`access_level`**: Controls wiki visibility (your Jekyll system)
- **`type`**: Categorizes content for queries
- **`name`**: Full character name (redundant with filename but useful for queries)
- **`location`**: Current location with [[wiki links]]
- **`faction`**: Primary allegiance
- **`status`**: Current state for plot tracking
- **`importance`**: How significant they are to the story
- **`remnant-exposure`**: Post-nuclear contamination level (your setting)
- **`attitude-party`**: Relationship to player characters
- **`last-updated`**: For consistency tracking
- **`tags`**: Multiple categories for filtering

---

## Phase 4: Writing Your First Queries

### Query 1: List All NPCs
Start simple - see all your characters:
```markdown
```dataview
LIST
FROM #npc
```
```

**What this does:**
- `LIST` = Show as bullet points
- `FROM #npc` = Only files tagged with #npc

### Query 2: Show NPC Details in Table
```markdown
```dataview
TABLE location, faction, status
FROM #npc
```
```

**Breaking it down:**
- `TABLE location, faction, status` = Show these three fields as columns
- Column headers automatically use the field names

### Query 3: Filter by Location
```markdown
```dataview
TABLE faction, attitude-party as "Party Relations"
FROM #npc
WHERE location = "[[Port Zephyr]]"
```
```

**New concepts:**
- `WHERE` = Filter condition
- `as "Party Relations"` = Custom column name
- Location must match exactly (including [[ ]])

### Query 4: Find Incomplete Profiles
```markdown
```dataview
LIST
FROM #npc
WHERE !faction OR !location OR !status
```
```

**Logic operators:**
- `!faction` = Field is empty/missing
- `OR` = Any of these conditions
- `AND` = All conditions must be true

---

## Phase 5: Building Your NPC Dashboard

### Step 1: Create the Dashboard File
1. **Create new note** called "NPC Dashboard"
2. **Set proper frontmatter:**
```yaml
---
access_level: secret  # DM-only dashboard
type: dashboard
---
```

### Step 2: Add Progressive Complexity Queries

**Basic Overview:**
```markdown
## All NPCs by Status
```dataview
TABLE location, faction, importance
FROM #npc
GROUP BY status
```
```

**Faction Analysis:**
```markdown
## Characters by Faction
```dataview
TABLE location, attitude-party as "Party Relations", importance
FROM #npc
WHERE faction
GROUP BY faction
SORT importance DESC
```
```

**Problem Detection:**
```markdown
## Consistency Issues
### Missing Key Information
```dataview
LIST file.mtime as "Created"
FROM #npc
WHERE !location OR !faction OR !status
```

### Orphaned Characters (No Connections)
```dataview
LIST
FROM #npc
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
```
```

---

## Phase 6: Advanced Techniques

### Working with Dates
```markdown
```dataview
TABLE file.mtime as "Last Modified", last-updated as "Content Updated"
FROM #npc
WHERE file.mtime > date("2024-01-01")
SORT file.mtime DESC
```
```

### Complex Filtering
```markdown
```dataview
TABLE faction, location, remnant-exposure as "Contamination"
FROM #npc
WHERE (importance = "major" OR attitude-party = "friendly") 
  AND remnant-exposure != "none"
```
```

### String Operations
```markdown
```dataview
LIST
FROM #npc
WHERE contains(faction, "Remnant") OR contains(faction, "Keeper")
```
```

---

## Phase 7: Troubleshooting Common Issues

### Problem: Query Shows Nothing
**Check:**
1. Are files properly tagged with #npc?
2. Is the field name spelled correctly?
3. Are you using the right folder path?

### Problem: Field Shows Empty
**Solutions:**
```markdown
# Show files missing the field
```dataview
LIST
FROM #npc
WHERE !faction
```

# Show all field values to debug
```dataview
TABLE faction, file.frontmatter.faction
FROM #npc
```
```

### Problem: Links Don't Work in Queries
**Correct format:**
- `WHERE location = "[[Port Zephyr]]"` ✅
- `WHERE location = "Port Zephyr"` ❌

---

## Phase 8: Integration with Your Wiki System

### Respecting Access Levels
Create separate dashboards for different access levels:

**Player Dashboard** (access_level: player):
```markdown
```dataview
TABLE location, faction, attitude-party as "Relations"
FROM #npc
WHERE access_level = "player" OR access_level = "public"
```
```

**DM Dashboard** (access_level: secret):
```markdown
```dataview
TABLE location, faction, secret-allegiance as "Hidden Loyalty", plot-hooks as "Story Potential"
FROM #npc
```
```

### Maintaining Wiki Links
Always use proper wiki link format in your frontmatter:
```yaml
location: "[[Port Zephyr]]"
faction: "[[Remnant Keepers]]"
enemy-of: "[[Captain Marcus Steel]], [[The Rust Tide Pirates]]"
```

---

## Phase 9: Automation and Consistency

### Weekly Maintenance Queries
Create a "Maintenance Dashboard" with these queries:

```markdown
## Files Modified This Week
```dataview
TABLE file.mtime as "Modified", status
FROM #npc
WHERE file.mtime > date(today) - dur(7 days)
```

## Characters Needing Updates
```dataview
LIST last-updated
FROM #npc
WHERE last-updated < date("2024-01-01") AND status = "active"
```

## Naming Convention Check
```dataview
LIST
FROM #npc
WHERE !contains(file.name, " ") OR contains(file.name, "_")
```
```

---

## Phase 10: Next Steps and Advanced Features

### After Mastering Basic Queries
1. **Learn DataviewJS** for complex calculations
2. **Explore the Tasks plugin** integration
3. **Set up Template hotkeys** for quick NPC creation
4. **Create relationship matrices** between characters
5. **Build location-based character lists**

### Expanding the System
Once comfortable with NPCs, apply the same principles to:
- **Locations** - Track contamination levels, populations, factions
- **Factions** - Monitor relationships, resources, goals
- **Quests** - Track completion, requirements, NPCs involved
- **Items** - Manage magical contamination, ownership, locations

---

## Quick Reference: Essential Query Patterns

```markdown
# Basic filtering
FROM #npc WHERE status = "active"

# Multiple conditions  
FROM #npc WHERE status = "active" AND importance = "major"

# Text searching
FROM #npc WHERE contains(faction, "Remnant")

# Empty field check
FROM #npc WHERE !location

# Date comparisons
FROM #npc WHERE file.mtime > date("2024-01-01")

# Grouping and sorting
FROM #npc GROUP BY faction SORT importance DESC
```

Remember: Start simple, test each query, then build complexity gradually. The power of Dataview comes from consistent data entry and thoughtful query design!