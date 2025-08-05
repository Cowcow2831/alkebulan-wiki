# Practical Implementation: Your First NPC with Dataview
*Step-by-step walkthrough of creating and querying your first character*

---

## Let's Create a Sample NPC Together

### Step 1: Create Your First NPC File
1. **Create a new note** named: `Kaia Sunweaver`
2. **Copy the NPC template** and fill it out like this:

```yaml
---
access_level: player
type: npc
name: "Kaia Sunweaver"
location: "[[Port Zephyr]]"
faction: "[[Remnant Keepers]]"
secondary-faction: "[[Harbor Authority]]"
status: active
importance: major
remnant-exposure: moderate
attitude-party: neutral
moral-complexity: "Struggles between duty to peace and protecting secrets"
secret-allegiance: "[[Remnant Keepers]]"
last-updated: 2024-01-15
last-appearance: "Session 3 - Harbor District Investigation"
plot-hooks: "Knows location of pre-Cataclysm archive, seeking trustworthy allies"
tags:
  - npc
  - port-zephyr
  - official
  - keeper
  - rebuilding
---
```

### Step 2: Test Your First Query
Create a new note called "Test Dashboard" and add:

```markdown
```dataview
LIST
FROM #npc
```
```

**Expected Result:** You should see a bullet point with "Kaia Sunweaver"

### Step 3: Make It More Useful
Replace that query with:

```markdown
```dataview
TABLE location, faction, status
FROM #npc
```
```

**Expected Result:** A table showing Kaia's details in columns.

---

## Progressive Query Building

### Start Simple, Add Complexity

**Query 1: Basic List**
```markdown
```dataview
LIST
FROM #npc
```
```

**Query 2: Add Information**
```markdown
```dataview
LIST faction
FROM #npc
```
```

**Query 3: Make it a Table**
```markdown
```dataview
TABLE faction, location
FROM #npc
```
```

**Query 4: Add Custom Column Names**
```markdown
```dataview
TABLE 
  faction as "Allegiance", 
  location as "Current Location",
  attitude-party as "Party Relations"
FROM #npc
```
```

**Query 5: Add Filtering**
```markdown
```dataview
TABLE 
  faction as "Allegiance", 
  location as "Current Location",
  importance as "Plot Significance"
FROM #npc
WHERE status = "active"
```
```

---

## Building Your Real Dashboard

### Step 1: Create Your Main NPC Dashboard
Create a note called "NPC Dashboard" with this structure:

```yaml
---
access_level: secret  # DM-only dashboard
type: dashboard
---
```

### Step 2: Add Your Core Queries

**Start with these essential queries:**

```markdown
# NPC Management Dashboard

## Quick Overview
```dataview
TABLE 
  location as "Location",
  faction as "Faction", 
  importance as "Importance",
  status as "Status"
FROM #npc
SORT importance DESC, status ASC
```

## Active Major Characters
```dataview
TABLE 
  location as "Location",
  attitude-party as "Party Relations",
  last-appearance as "Last Seen"
FROM #npc
WHERE status = "active" AND importance = "major"
```

## Characters by Location
```dataview
TABLE 
  faction as "Faction",
  importance as "Importance",
  attitude-party as "Party Relations"
FROM #npc
GROUP BY location
```
```

### Step 3: Add Problem Detection

```markdown
## Consistency Checks

### Missing Key Information
```dataview
LIST file.mtime as "Created"
FROM #npc
WHERE !location OR !faction OR !status
```

### Characters Not Seen Recently
```dataview
TABLE last-appearance, status
FROM #npc
WHERE status = "active" AND (!last-appearance OR last-appearance < "Session 1")
```
```

---

## Testing and Troubleshooting

### Common Problems and Solutions

**Problem: Query shows nothing**
- Check: Do your files have the #npc tag?
- Check: Are field names spelled exactly right?
- Test with: `LIST FROM #npc` (shows all files with #npc tag)

**Problem: Field shows empty**
- Check: Is the frontmatter formatted correctly with colons?
- Test with: `TABLE file.frontmatter.faction FROM #npc` (shows raw frontmatter)
- Fix: Make sure quotes and formatting match the template

**Problem: Wiki links don't work in queries**
- Wrong: `WHERE location = "Port Zephyr"`
- Right: `WHERE location = "[[Port Zephyr]]"`
- Include the double brackets in your frontmatter

### Debug Query Template
When something's not working, use this to see your raw data:

```markdown
```dataview
TABLE 
  file.name as "File Name",
  file.frontmatter.faction as "Faction Raw",
  file.frontmatter.location as "Location Raw",
  file.frontmatter.tags as "Tags Raw"
FROM #npc
```
```

---

## Expanding Your System

### After Your First NPC Works

**Step 1: Create 2-3 More NPCs**
- Use the same template
- Vary the locations and factions
- Watch your dashboard populate

**Step 2: Add Location-Specific Queries**
```markdown
## Port Zephyr Characters
```dataview
TABLE faction, importance, attitude-party
FROM #npc
WHERE location = "[[Port Zephyr]]"
```
```

**Step 3: Add Faction Analysis**
```markdown
## Remnant Keepers Network
```dataview
TABLE 
  location as "Territory",
  secret-allegiance as "Hidden Role",
  plot-hooks as "Story Potential"
FROM #npc
WHERE contains(faction, "Remnant") OR contains(secret-allegiance, "Remnant")
```
```

### Advanced Queries to Try Later

**Find Moral Complexity:**
```markdown
```dataview
TABLE moral-complexity, secret-allegiance
FROM #npc
WHERE moral-complexity OR secret-allegiance
```
```

**Track Contamination Exposure:**
```markdown
```dataview
TABLE location, remnant-exposure, status
FROM #npc
WHERE remnant-exposure != "none"
GROUP BY remnant-exposure
```
```

---

## Integration with Your Wiki System

### Respecting Access Levels

**Player-Safe Dashboard (access_level: player):**
```markdown
## Known Characters
```dataview
TABLE 
  location as "Location",
  faction as "Known Allegiance"
FROM #npc
WHERE access_level = "player" OR access_level = "public"
```
```

**Full DM Dashboard (access_level: secret):**
```markdown
## Complete Character Overview
```dataview
TABLE 
  location as "Location",
  faction as "Public Faction",
  secret-allegiance as "Hidden Loyalty",
  plot-hooks as "Story Hooks"
FROM #npc
```
```

### Maintaining Consistency with Jekyll

**Important:** Your Jekyll wiki will still work normally. The frontmatter fields for Dataview don't interfere with your Jekyll processing. You're just adding more metadata that Obsidian can use while Jekyll ignores the extra fields.

---

## Next Session Preparation

### Before Your Next Game

**Run these queries to prep:**

```markdown
## Characters Due to Appear
```dataview
TABLE 
  location as "Where",
  attitude-party as "Attitude",
  plot-hooks as "Available Hooks"
FROM #npc
WHERE contains(tags, "port-zephyr") AND status = "active"
```

## Relationship Reminders
```dataview
TABLE 
  faction as "Allegiance",
  moral-complexity as "Internal Conflict",
  secret-allegiance as "Hidden Truth"
FROM #npc
WHERE importance = "major"
```
```

### Quick Reference Card
Create a simple query for quick NPC lookup during play:

```markdown
## Quick NPC Reference
```dataview
TABLE 
  location as "Where", 
  faction as "Side",
  attitude-party as "Attitude"
FROM #npc
WHERE status = "active"
SORT location, importance DESC
```
```

---

## Success Metrics

**You'll know the system is working when:**
1. ✅ Your dashboard shows all NPCs correctly
2. ✅ Queries update automatically when you create new NPCs
3. ✅ You can quickly find characters by location/faction
4. ✅ Missing information is immediately visible
5. ✅ You spend less time searching for character details during sessions

**Time Investment:**
- Initial setup: 2-3 hours
- Per NPC creation: 15-20 minutes (including full template)
- Weekly maintenance: 5-10 minutes
- Session prep benefit: Saves 20-30 minutes per session

Start with one NPC, get comfortable with the basic queries, then expand gradually. The system grows more valuable as you add more characters!