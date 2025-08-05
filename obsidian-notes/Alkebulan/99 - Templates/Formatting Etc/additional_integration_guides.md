# Essential Integration & Style Guides Collection
*Complete toolkit for consistent worldbuilding and campaign management*

---

## 1. Naming Convention & Terminology Guide

### **AI Assistant Instructions:**
When creating content for this campaign, follow these exact naming patterns and terminology to maintain consistency.

### **Character Names**
**Format:** `[FirstName] [LastName]` or `[FirstName] "[Nickname]" [LastName]`
- ✅ **Correct:** `Kaia Sunweaver`, `Marcus "Iron Hands" Steel`
- ❌ **Incorrect:** `kaia_sunweaver`, `Marcus Steel (Iron Hands)`, `IronHandsMarcus`

**Cultural Naming Patterns:**
- **Port Zephyr:** Maritime/trade-influenced names (Saltwind, Tidecaller, Harborborn)
- **Imperial:** Formal, hierarchical titles (First Speaker, Harbor Authority, Senior Technician)
- **Remnant Keepers:** Nature/hope themes (Sunweaver, Brightward, Renewal)
- **Survivor Communities:** Descriptive/occupational surnames (Scavenger, Builder, Healer)

### **Location Names**
**Format:** `[Proper Name]` or `[Proper Name] ([Region/Type])`
- ✅ **Correct:** `Port Zephyr`, `The Whispering Wastes`, `Memorial Gardens (Port Zephyr)`
- ❌ **Incorrect:** `port_zephyr`, `The port of zephyr`, `PortZephyr`

### **Faction Names**
**Format:** `[The] [Descriptive Name]` with proper articles
- ✅ **Correct:** `The Remnant Keepers`, `Harbor Authority`, `The Rust Tide Pirates`
- ❌ **Incorrect:** `remnant keepers`, `The Harbor Authority The`, `rust-tide-pirates`

### **Terminology Consistency**
**Use These Terms (Never Variants):**
- **Remnant Magic** (not "residual magic", "leftover magic", "old magic")
- **The Cataclysm** (not "the disaster", "the war", "the catastrophe")
- **Contamination levels:** none, low, moderate, high, critical (exactly these words)
- **Imperial expansion** (not "empire expansion", "imperial growth")
- **Post-Cataclysm** (hyphenated, capitalized)

### **File Naming Conventions**
```
NPCs: [FirstName] [LastName].md
Locations: [Location Name].md
Factions: [Faction Name].md
Adventures: [Adventure Name].md
Creatures: [Species Name].md
```

---

## 2. Cross-Reference Integration Guide

### **AI Assistant Instructions:**
Always create meaningful connections between content elements using these patterns.

### **Automatic Linking Rules**
**When creating any content, automatically link to:**
- **Locations mentioned** → Use `[[Location Name]]` format
- **NPCs referenced** → Use `[[Character Name]]` format  
- **Factions named** → Use `[[Faction Name]]` format
- **Related adventures** → Use `[[Adventure Title]]` format

### **Relationship Depth Requirements**
**Every NPC must connect to:**
- At least one location (where they live/work)
- At least one faction (primary allegiance)
- At least one other NPC (ally, enemy, family, colleague)

**Every Location must connect to:**
- At least 2-3 key NPCs (who run/inhabit it)
- At least one faction (who controls/influences it)
- At least one other location (trade routes, political connections)

**Every Faction must connect to:**
- Multiple NPCs (members, allies, enemies)
- Multiple locations (territory, influence, interests)
- At least 2 other factions (allies, enemies, rivals)

### **Cross-Reference Quality Standards**
**Minimum Connection Depth:**
- **Major elements:** 5+ meaningful connections
- **Minor elements:** 2-3 connections
- **Background elements:** 1-2 connections

**Connection Types to Track:**
- **Political:** Alliances, rivalries, power structures
- **Economic:** Trade relationships, resource dependencies
- **Social:** Family ties, friendships, romantic relationships
- **Geographic:** Proximity, trade routes, territorial boundaries
- **Historical:** Past events, shared experiences, legacy connections

---

## 3. Session Integration & Campaign Continuity Guide

### **AI Assistant Instructions:**
When creating or updating content, maintain campaign continuity using these protocols.

### **Session Impact Tracking**
**After Every Session:**
```yaml
# Add to affected content frontmatter
last-session-impact: "Session X"
recent-changes: "Brief description of what changed"
player-interactions: "How party affected this element"
status-change: "Any status updates needed"
```

### **Continuity Consistency Rules**
**Before Creating New Content:**
1. **Check existing canon** - Search vault for related information
2. **Verify timeline consistency** - Ensure dates and sequences align
3. **Confirm geographic logic** - Map relationships make sense
4. **Review factional politics** - New content fits existing power structures

### **Campaign State Management**
**Track These Elements:**
```yaml
campaign-date: "Current in-world date"
session-count: "Session number"
major-events: ["List of significant campaign events"]
party-reputation: "How factions view the party"
political-changes: "Recent power shifts or developments"
environmental-changes: "Contamination spread, cleanup efforts"
```

### **Player Knowledge Tracking**
**Information Classification:**
- **Public Knowledge:** What everyone in the world knows
- **Regional Knowledge:** What locals in an area know
- **Factional Knowledge:** What faction members know
- **Secret Knowledge:** What only specific NPCs know
- **Player Discovered:** What the party has learned through play

---

## 4. Visual & Sensory Description Guide

### **AI Assistant Instructions:**
Use these sensory frameworks to create immersive, consistent descriptions.

### **Environmental Description Framework**
**For Every Location Include:**
- **Visual:** Architecture, layout, lighting, color palette
- **Auditory:** Ambient sounds, voices, machinery, nature
- **Olfactory:** Smells that define the space (clean air, contamination, food, industry)
- **Tactile:** Temperature, humidity, textures, air quality
- **Atmospheric:** Mood, energy level, social dynamics

### **Post-Cataclysm Sensory Signatures**
**Contaminated Areas:**
- Visual: Subtle wrongness, unnatural colors, twisted growth
- Auditory: Electrical hums, silence where there should be life
- Olfactory: Metallic tang, ozone, absence of natural scents
- Tactile: Hair standing on end, static electricity, temperature variations

**Clean Areas:**
- Visual: Natural colors, healthy growth, clear skies
- Auditory: Normal wildlife, human activity, natural sounds
- Olfactory: Fresh air, natural scents, food aromas
- Tactile: Comfortable temperatures, normal humidity

**Community Spaces:**
- Visual: Mixed old/new architecture, signs of rebuilding
- Auditory: Conversation, work sounds, children playing
- Olfactory: Cooking food, human activity, local industries
- Tactile: Warmth of community, bustling energy

### **Character Description Standards**
**Physical Appearance:**
- **Basic details:** Age, build, distinctive features
- **Contamination signs:** Subtle mutations, protective gear usage
- **Social indicators:** Clothing quality, profession markers, wealth signs
- **Personality cues:** Posture, mannerisms, expression patterns

---

## 5. Moral Complexity & Theme Integration Guide

### **AI Assistant Instructions:**
Ensure all content reflects the campaign's core themes and moral complexity.

### **Core Theme Integration Requirements**
**Every Major Element Should Address:**
- **Environmental Allegory:** How does this reflect real-world environmental issues?
- **Community Resilience:** How does this show people rebuilding/adapting?
- **Moral Complexity:** What ethical dilemmas or gray areas exist?
- **Institutional Critique:** How do power structures help or harm?

### **Moral Complexity Standards**
**No Pure Heroes or Villains:**
- Every "good" character has flaws, blind spots, or costs to their actions
- Every "bad" character has understandable motivations or tragic backgrounds
- Every institution has both positive and negative aspects
- Every solution creates new problems

**Ethical Dilemma Framework:**
- **Resource Scarcity:** Who gets limited clean resources?
- **Safety vs. Freedom:** How much control is acceptable for protection?
- **Truth vs. Stability:** When is secrecy justified to prevent panic?
- **Individual vs. Community:** When do personal needs conflict with group needs?

### **Political Complexity Requirements**
**Faction Relationships:**
- No faction is entirely right or wrong
- Alliances shift based on circumstances
- Personal relationships cross factional lines
- Historical grievances complicate current politics

---

## 6. Research & Inspiration Integration Guide

### **AI Assistant Instructions:**
When incorporating real-world research or inspiration, follow these adaptation protocols.

### **Research Integration Rules**
**Historical Parallels:**
- Draw from real post-disaster recovery (Hiroshima, Chernobyl, natural disasters)
- Adapt without direct copying - change names, details, context
- Focus on human resilience and adaptation patterns
- Maintain respect for real-world tragedies

**Scientific Accuracy:**
- Radiation/contamination effects should be plausible
- Environmental recovery follows realistic timelines
- Technology levels remain consistent with setting
- Medical knowledge reflects available resources

### **Inspiration Source Guidelines**
**When Using Media Inspiration:**
- **Visual Arts:** Adapt mood, color, composition - not specific imagery
- **Literature:** Use themes, character types, situations - not plots
- **Film/TV:** Borrow atmosphere, relationships, conflicts - not storylines
- **Games:** Adapt mechanics, world-building, player agency - not narratives

### **Cultural Sensitivity Requirements**
- Avoid appropriating specific cultural practices
- Create original traditions that feel authentic
- Respect real-world parallels without exploitation
- Focus on universal human experiences

---

## 7. Collaborative Content Guide

### **AI Assistant Instructions:**
When multiple people contribute content, maintain consistency using these protocols.

### **Content Ownership Standards**
**Clear Attribution:**
```yaml
created-by: "Creator name"
contributed-by: ["List of contributors"]
last-major-edit-by: "Editor name"
collaboration-notes: "What others can/cannot change"
```

### **Collaborative Editing Rules**
**Permission Levels:**
- **Creator:** Can make any changes
- **Co-creator:** Can edit with creator approval
- **Contributor:** Can suggest changes, make minor corrections
- **Reader:** Can comment but not edit

### **Integration Standards**
**New Contributions Must:**
- Follow all existing style guides
- Connect to at least 2 existing elements
- Include complete frontmatter
- Respect established canon
- Add value without contradicting existing content

---

## Quick Reference: Guide Priority

### **Essential (Use Every Time):**
1. **Dataview Integration Guide** - Database functionality
2. **Wiki Formatting Guide** - Access control & publishing
3. **Naming Convention Guide** - Consistency in terminology

### **Important (Use Frequently):**
4. **Cross-Reference Integration Guide** - Meaningful connections
5. **Session Integration Guide** - Campaign continuity
6. **Moral Complexity Guide** - Theme consistency

### **Specialized (Use When Relevant):**
7. **Visual Description Guide** - Immersive writing
8. **Research Integration Guide** - Adapting real-world sources
9. **Collaborative Content Guide** - Multi-creator projects

---

*These guides work together to create a comprehensive system for consistent, high-quality worldbuilding that maintains thematic integrity while enabling collaborative development.*