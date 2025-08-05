# Obsidian Tools for Worldbuilding Consistency & Propagation
*Specific plugins and techniques for managing your evolving campaign world*

---

## Essential Plugins for Consistency Tracking

### **1. Dataview Plugin** ⭐ **CRITICAL**
**What it does:** Creates dynamic queries to track relationships and find inconsistencies
**For worldbuilding:** Automatically generates lists of all content related to specific elements

**Key Uses:**
```markdown
# Find all NPCs in Port Zephyr
```dataview
LIST
FROM #npc 
WHERE contains(location, "Port Zephyr")
```

# Track incomplete character profiles
```dataview
TABLE status, last-updated
FROM #npc 
WHERE !status OR status = "incomplete"
```

# Find all references to specific factions
```dataview
LIST
FROM [[]] OR outgoing([[The Remnant Keepers]])
```

**Setup for your world:**
- Tag all content types (`#location`, `#npc`, `#faction`, `#event`)
- Use consistent metadata fields (status, location, allegiance)
- Create dashboard pages with multiple queries

### **2. Graph Analysis Plugin** 
**What it does:** Provides algorithms that analyze relationships between notes, including Co-Citations (shows which notes are frequently cited together) and Community Detection
**For worldbuilding:** Identifies which elements are most interconnected and finds orphaned content

**Practical applications:**
- **Co-Citations:** Find NPCs that always appear together (are they redundant?)
- **Community Detection:** Identify natural groupings (factions, regions)
- **Link Prediction:** Suggests missing connections between related elements

### **3. Backlinks and Unlinked Mentions (Core Feature)**
**What it does:** Shows every reference to a note, even if not explicitly linked
**For worldbuilding:** Track all mentions of names, places, organizations

**Usage for consistency:**
- View backlinks panel for any NPC/location
- Check "Unlinked mentions" to find places you forgot to link
- Identify all content that needs updating when you change something

### **4. Search and Replace (Core + Better Search Plugin)**
**What it does:** Global find-and-replace across your entire vault
**For worldbuilding:** Update names, titles, or terms consistently

**Critical for propagation:**
```
Find: "Harbor Master Kaia"
Replace: "First Speaker Kaia Sunweaver"
```

**Pro tip:** Always check the preview before replacing to avoid false positives

---

## Specific Workflows for Consistency Management

### **The "Reference Dashboard" System**
Create index pages that automatically track related content:

**Characters Dashboard:**
```markdown
# Character Consistency Check

## All NPCs by Status
```dataview
TABLE status, location, faction, last-updated
FROM #npc 
SORT status ASC, last-updated DESC
```

## Incomplete Profiles
```dataview
LIST
FROM #npc 
WHERE !description OR !status OR !location
```

## Characters by Faction
```dataview
TABLE location, role
FROM #npc 
GROUP BY faction
```
```

**Location Dashboard:**
```markdown
# Location Consistency Check

## All Locations by Region
```dataview
TABLE population, government, key-npcs
FROM #location 
GROUP BY region
```

## Locations Missing Key Info
```dataview
LIST
FROM #location 
WHERE !population OR !government OR !description
```
```

### **The "Propagation Tracking" Template**
For major changes, create a tracking note:

```markdown
# Change Log: [Element Name]
Date: [[YYYY-MM-DD]]
Type: #change-log

## Change Details
**Old Value:** 
**New Value:** 
**Reason:** 

## Impact Analysis
```dataview
LIST
FROM outgoing([[Element Name]])
```

## Update Checklist
- [ ] Primary profile updated
- [ ] Adventure references checked
- [ ] Related NPC profiles updated
- [ ] Location descriptions reviewed
- [ ] Search & replace completed

## Related Elements to Review
```dataview
TABLE status, last-updated
FROM #location OR #npc OR #faction
WHERE contains(file.content, "Element Name")
```
```

### **The "Orphan Hunter" Query**
Find content that isn't connected to anything:

```markdown
# Orphaned Content Check

## NPCs with no connections
```dataview
LIST file.mtime
FROM #npc 
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
```

## Locations not referenced by NPCs
```dataview
LIST
FROM #location 
WHERE length(file.inlinks) = 0
```
```

---

## Advanced Consistency Techniques

### **Smart Property Tracking**
Use Obsidian's Properties feature for structured data:

```yaml
---
type: npc
name: "Kaia Sunweaver"
title: "First Speaker"
location: "[[Port Zephyr]]"
faction: "[[The Remnant Keepers]]"
status: "complete"
last-updated: "2024-01-15"
appearances: ["[[Echoes of the Old Harbor]]", "[[Port Zephyr Gazetteer]]"]
---
```

**Benefits:**
- Dataview can query properties precisely
- Visual consistency in metadata
- Easy to spot missing information

### **Naming Convention Enforcement**
Create standardized naming patterns and check compliance:

```markdown
# Naming Convention Check

## NPCs not following [FirstName] [LastName] pattern
```dataview
LIST
FROM #npc 
WHERE !contains(file.name, " ") OR contains(file.name, "_")
```

## Locations missing region specification
```dataview
LIST
FROM #location 
WHERE !contains(file.name, "(") OR !contains(file.name, ")")
```
```

### **Relationship Mapping with Dataview**
Track complex relationships:

```markdown
# Faction Relationship Matrix

```dataview
TABLE 
  faction as "Faction",
  choice(contains(relationship, "ally"), "🤝", 
    choice(contains(relationship, "enemy"), "⚔️", 
      choice(contains(relationship, "neutral"), "🤷", "❓"))) as "Relationship"
FROM #faction-relationship 
WHERE faction-a = "[[The Remnant Keepers]]"
```
```

---

## Plugins for Specific Worldbuilding Needs

### **For Visual Relationship Tracking:**
- **Juggl Plugin:** Interactive graph view with better customization
- **Neo4j Graph View:** Advanced graph database visualization
- **Smart Connections Visualizer:** AI-powered relationship mapping

### **For Template Consistency:**
- **Templater Plugin:** Advanced templating capabilities for automated content generation and dynamic note creation that saves time and enhances consistency
- **QuickAdd Plugin:** Consistent content creation with prompts
- **Note Composer:** Merge and split notes while maintaining links

### **For Content Management:**
- **Tag Wrangler:** Rename tags globally (changes propagate everywhere)
- **Kanban Plugin:** Visual task management for tracking worldbuilding progress with drag-and-drop functionality
- **Calendar Plugin:** Structure daily note-taking and reviews in calendar format for organized worldbuilding sessions

---

## Practical Setup for Your Post-Cataclysm World

### **Recommended Folder Structure:**
```
Your Vault/
├── 00-Dashboard/
│   ├── Character Dashboard.md
│   ├── Location Dashboard.md
│   ├── Faction Dashboard.md
│   └── Change Log Dashboard.md
├── 01-Adventures/
├── 02-Characters/
├── 03-Locations/
├── 04-Factions/
├── 05-History/
├── 06-Mechanics/
└── 99-Templates/
```

### **Essential Tags for Your Setting:**
```yaml
Content Types:
- #npc, #location, #faction, #event, #item, #rule

Status Tracking:
- #complete, #draft, #needs-review, #incomplete

Regional Tags:
- #port-zephyr, #cerulean-reach, #whispering-wastes

Thematic Tags:
- #contamination, #imperial, #resistance, #merchants
```

### **Key Queries for Your World:**

**Contamination Consistency Check:**
```markdown
```dataview
TABLE contamination-level, safety-measures, population-affected
FROM #location 
WHERE contamination-level
SORT contamination-level DESC
```
```

**Imperial Presence Tracking:**
```markdown
```dataview
LIST imperial-presence, local-resistance
FROM #location 
WHERE contains(tags, "imperial")
```
```

**NPC Faction Alignment:**
```markdown
```dataview
TABLE faction, loyalty-level, secret-allegiance
FROM #npc 
WHERE faction
GROUP BY faction
```
```

---

## Daily Consistency Workflow

### **Weekly Consistency Check (15 minutes):**
1. **Open Character Dashboard** - check for incomplete profiles
2. **Run Orphan Hunter queries** - link unconnected content
3. **Review recent changes** - update related content
4. **Check naming conventions** - fix inconsistencies

### **Before Publishing Content:**
1. **Search for element names** across vault
2. **Check backlinks** for all major elements
3. **Run relationship queries** to verify connections
4. **Update metadata** (last-updated, status)

### **After Major Changes:**
1. **Create change log note** with tracking template
2. **Run propagation queries** to find affected content
3. **Execute search & replace** for consistent terminology
4. **Update dashboard views** to reflect changes

---

## Quick Reference: Essential Dataview Queries

```markdown
# Find everything mentioning a specific element
```dataview
LIST
WHERE contains(file.content, "Kaia Sunweaver")
```

# Check last updated dates
```dataview
TABLE file.mtime as "Last Modified"
FROM #npc 
SORT file.mtime DESC
```

# Find missing relationships
```dataview
LIST
FROM #npc 
WHERE !faction OR !location
```

# Track completion status
```dataview
TABLE status, file.mtime
FROM ""
WHERE status != "complete"
```
```

---

## Pro Tips for Obsidian Worldbuilding

1. **Use MOCs (Maps of Content)** as relationship hubs - one note that links to all related content
2. **Enable "Strict Line Breaks"** in settings for better markdown compatibility
3. **Use Aliases** in frontmatter for alternative names/titles
4. **Set up hotkeys** for your most-used Dataview queries
5. **Create template notes** with pre-filled Dataview queries for consistency checking

The key to successful Obsidian worldbuilding is setting up these systems early and using them consistently. The time investment in learning Dataview queries pays off exponentially as your world grows.