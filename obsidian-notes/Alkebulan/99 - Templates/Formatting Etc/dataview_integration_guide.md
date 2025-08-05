# Dataview Integration Guide for AI and Human Use
*Comprehensive instructions for integrating Dataview functionality into existing content templates*

---

## AI PROMPT INSTRUCTIONS

When an AI assistant is asked to enhance existing templates with Dataview functionality, follow these exact specifications:

### **MANDATORY PRESERVATION RULES**
1. **NEVER remove or significantly alter existing template sections** - preserve all current structure, field names, and organization
2. **NEVER change the user's workflow** - if they currently fill out "Basic Info" first, keep that section first
3. **NEVER replace simple fields with complex structures** unless specifically requested
4. **ALWAYS maintain backward compatibility** - existing notes using the old template must still work

### **REQUIRED FRONTMATTER ADDITIONS**
Add these fields to ANY template being enhanced with Dataview capability:

```yaml
---
# CORE DATAVIEW FIELDS (Required for all templates)
access_level: player  # Options: public, player, dm, secret
type: [content-type]  # npc, location, faction, creature, adventure, religion, item
name: "Content Name"
status: active        # active, inactive, complete, draft, needs-review
importance: minor     # major, minor, background
last-updated: 2024-01-15
campaign: "Campaign Name"

# RELATIONSHIP FIELDS (Add as appropriate)
location: "[[Location Name]]"  # For NPCs, creatures, adventures
faction: "[[Faction Name]]"    # For NPCs, locations, adventures
region: "[[Region Name]]"      # For locations, creatures, factions

# TAGS (Always include)
tags:
  - [primary-type]     # npc, location, faction, etc.
  - [category-tag]     # role, region, theme specific tags
  - [theme-tag]        # setting-specific thematic tags
---
```

### **CONTENT-SPECIFIC FIELD ADDITIONS**

**For NPC Templates, add:**
```yaml
attitude-party: neutral  # friendly, neutral, hostile, unknown
remnant-exposure: low    # none, low, moderate, high, critical (setting-specific)
moral-complexity: ""     # Brief ethical notes
secret-allegiance: ""    # Hidden loyalties
plot-hooks: ""          # Available story threads
last-appearance: ""     # Session tracking
```

**For Location Templates, add:**
```yaml
population: 0           # Numeric population
government: ""          # Government type
contamination-level: none  # none, low, moderate, high, critical
safety-measures: ""     # Protection methods
key-npcs: []           # List of important characters
connected-locations: [] # Adjacent/linked locations
factions-present: []    # Active factions
```

**For Creature Templates, add:**
```yaml
habitat: "[[Location]]"
cr: 1                  # Challenge rating
creature-type: beast   # beast, monstrosity, etc.
threat-level: low      # minimal, low, moderate, high, extreme
remnant-affected: false # Boolean for contamination
ecological-role: ""     # Ecosystem function
```

**For Adventure Templates, add:**
```yaml
quest-giver: "[[NPC Name]]"
quest-type: investigation  # investigation, combat, social, etc.
level-range: "1-3"
locations-involved: []
npcs-involved: []
factions-affected: []
completion-status: planned  # planned, active, paused, complete
session-started: ""
estimated-sessions: 1
```

### **WIKI INTEGRATION REQUIREMENTS**

**ALWAYS add these comment blocks to preserve wiki access control:**

```markdown
<!-- PLAYER_SAFE_START -->
[Content safe for players to read]
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
[DM-only content, secrets, mechanics, plot hooks]
<!-- DM_END -->
```

**Rules for wiki sections:**
- Put basic descriptions, public information, and general knowledge in PLAYER_SAFE sections
- Put secrets, plot hooks, mechanical details, and behind-the-scenes information in DM sections
- When in doubt, put information in DM sections - it can always be moved to player-safe later

### **DASHBOARD QUERY TEMPLATES**

**When creating dashboard queries, use these patterns:**

**Basic Content Overview:**
```markdown
```dataview
TABLE status, importance, last-updated
FROM #[content-type]
SORT importance DESC, last-updated DESC
```
```

**Consistency Check Queries:**
```markdown
# Missing Required Information
```dataview
LIST
FROM #[content-type]
WHERE !location OR !status OR !importance
```

# Orphaned Content
```dataview
LIST file.mtime as "Created"
FROM #[content-type]
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
```

# Outdated Content
```dataview
TABLE last-updated, status
FROM #[content-type]
WHERE last-updated < date("2024-01-01") AND status = "active"
```
```

**Cross-Reference Queries:**
```markdown
# Content by Location
```dataview
TABLE type, importance, status
FROM ""
WHERE location = "[[Specific Location]]" OR contains(string(locations-involved), "[[Specific Location]]") OR habitat = "[[Specific Location]]"
```

# Faction Influence Map
```dataview
TABLE type, location, importance
FROM ""
WHERE faction = "[[Specific Faction]]" OR contains(string(factions-present), "[[Specific Faction]]") OR contains(string(factions-affected), "[[Specific Faction]]")
```
```

---

## HUMAN IMPLEMENTATION GUIDE

### **Phase 1: Minimal Integration (1-2 hours)**

**Step 1: Choose One Template Type**
- Start with your most-used template (usually NPCs)
- Don't try to convert everything at once

**Step 2: Add Essential Frontmatter**
Add only these fields to existing templates:
```yaml
---
access_level: player
type: [content-type]
location: "[[Location]]"  # if applicable
status: active
tags:
  - [content-type]
---
```

**Step 3: Test Basic Query**
Create a simple dashboard:
```markdown
```dataview
LIST
FROM #[content-type]
```
```

**Step 4: Verify It Works**
- Create one test content item using enhanced template
- Confirm it appears in the dashboard query
- Make sure existing content still works normally

### **Phase 2: Dashboard Development (2-3 hours)**

**Step 1: Add Status Tracking**
Enhance your frontmatter:
```yaml
importance: minor  # major, minor, background
last-updated: 2024-01-15
```

**Step 2: Build Management Dashboard**
```markdown
# [Content Type] Management

## Overview
```dataview
TABLE status, importance, last-updated
FROM #[content-type]
SORT importance DESC
```

## Needs Attention
```dataview
LIST
FROM #[content-type]
WHERE !location OR !status OR status = "draft"
```
```

**Step 3: Add Cross-References**
Include relationship fields:
```yaml
faction: "[[Faction Name]]"
connected-locations: ["[[Location A]]", "[[Location B]]"]
```

### **Phase 3: Full Integration (3-5 hours)**

**Step 1: Add Setting-Specific Fields**
Include campaign-relevant fields (contamination, moral complexity, etc.)

**Step 2: Implement Wiki Access Control**
Add PLAYER_SAFE and DM comment blocks to content sections

**Step 3: Build Comprehensive Dashboards**
Create dashboards for:
- Content overview and statistics
- Consistency checking and maintenance
- Cross-reference analysis (factions, locations, themes)
- Session preparation automation

**Step 4: Establish Maintenance Routine**
- Weekly consistency checks (10 minutes)
- Update last-updated fields when content changes
- Review orphaned content monthly
- Clean up outdated tags and links

---

## ERROR PREVENTION CHECKLIST

### **Before Implementing Changes:**
- [ ] Backup existing templates and content
- [ ] Test enhanced template with one piece of content
- [ ] Verify existing content still displays correctly
- [ ] Confirm dashboard queries return expected results

### **Common Mistakes to Avoid:**
- ❌ **Don't** change field names in existing frontmatter
- ❌ **Don't** remove sections users are accustomed to
- ❌ **Don't** make required fields that weren't required before
- ❌ **Don't** break existing internal links or references
- ❌ **Don't** change the fundamental workflow or structure

### **Quality Assurance:**
- ✅ **Do** preserve all existing functionality
- ✅ **Do** make new fields optional initially
- ✅ **Do** provide clear migration instructions
- ✅ **Do** test with actual content, not just examples
- ✅ **Do** document what changed and why

---

## TROUBLESHOOTING GUIDE

### **Query Returns Nothing:**
1. Check if files have the correct tag (#npc, #location, etc.)
2. Verify frontmatter formatting (colons, quotes, indentation)
3. Test with simpler query: `LIST FROM #tag`

### **Field Shows Empty:**
1. Check frontmatter field name spelling
2. Verify proper YAML formatting
3. Test with: `TABLE file.frontmatter.fieldname FROM #tag`

### **Links Don't Work:**
1. Ensure wiki links use proper format: `"[[Page Name]]"`
2. Check that linked pages exist
3. Verify double brackets are included in frontmatter values

### **Dashboard Performance Issues:**
1. Limit initial queries with `LIMIT 10`
2. Use specific FROM criteria instead of `FROM ""`
3. Consider splitting large dashboards into focused views

---

## INTEGRATION SUCCESS METRICS

**Week 1:** Basic queries work, content appears in dashboards
**Week 2:** Consistency checking identifies actual issues
**Week 3:** Cross-references reveal useful connections
**Month 1:** Dashboard saves significant prep time
**Month 3:** System feels essential to campaign management

**Time Investment vs. Benefit:**
- Setup: 4-8 hours
- Weekly maintenance: 10-15 minutes  
- Session prep savings: 20-45 minutes per session
- Long-term benefit: Prevents major consistency errors, enables advanced campaign management

---

*This guide ensures successful Dataview integration while preserving existing workflows and content structure.*