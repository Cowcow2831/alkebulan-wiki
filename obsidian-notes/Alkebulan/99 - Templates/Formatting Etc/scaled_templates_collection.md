---
access_level: secret
---

# Post-Cataclysm Content Templates Collection
*Comprehensive templates for all worldbuilding elements*

---

## 1. Location Template

```yaml
---
access_level: player
type: location
name: "Location Name"
region: "[[Geographic Region]]"
location-type: settlement  # settlement, ruin, landmark, natural, facility
population: 2500
government: "Council of Representatives"
contamination-level: moderate  # none, low, moderate, high, critical
safety-measures: "Remnant scanners, protective wards"
imperial-presence: minimal  # none, minimal, moderate, strong, occupied
key-npcs: ["[[Mayor Aldric]]", "[[Harbor Master Kaia]]"]
connected-locations: ["[[Cerulean Reach]]", "[[Whispering Bay]]"]
factions-present: ["[[Remnant Keepers]]", "[[Harbor Authority]]"]
economic-focus: "Maritime trade, fishing, shipping"
status: active
importance: major
last-updated: 2024-01-15
tags:
  - location
  - settlement  # or ruin, landmark, etc.
  - port-zephyr-region
  - trading-hub
  - contamination
---
```

**Location Template Body:**
```markdown
# Location Name
*Brief descriptive tagline*

<!-- PLAYER_SAFE_START -->
## Overview
**Type:** Trading port and administrative center
**Population:** ~2,500 permanent residents
**Government:** Council of Representatives elected by districts
**Known For:** Safe harbor, Remnant monitoring, cultural diversity

## Geography & Layout
Describe the physical layout, notable districts, terrain features, and how the location fits into the broader geography.

## Daily Life
What normal life looks like here - work, social patterns, common concerns, typical activities.

## Notable Locations
- **[[The Harbor Authority]]** - Administrative center and customs house
- **[[Memorial Gardens]]** - Community gathering space and remembrance site
- **[[The Scanning Station]]** - Remnant detection and decontamination facility

## Public Services
- Medical care and healing services
- Remnant monitoring and protection
- Trade regulation and dispute resolution
- Educational programs and skill training
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
## DM-Only Information

### Hidden Power Structures
**Real Decision Makers:** 
**Secret Influences:** 
**Corruption/Conflicts:** 
**Underground Networks:** 

### Contamination Reality
**Actual Contamination Level:** [May differ from public knowledge]
**Hidden Contaminated Areas:** 
**Secret Cleanup Efforts:** 
**Cover-ups or Denial:** 

### Imperial Intelligence
**Spy Networks:** 
**Collaboration/Resistance:** 
**Strategic Value to Empire:** 
**Hidden Imperial Assets:** 

### Adventure Hooks
1. **[Hook Name]:** Brief description and potential development
2. **[Hook Name]:** Connection to larger campaign themes
3. **[Hook Name]:** Local problem with broader implications

### Secrets & Mysteries
- Hidden pre-Cataclysm facilities or caches
- Covered-up incidents or historical events  
- Secret alliances or betrayals
- Unexplained phenomena or dangers

### Resources & Defenses
**Military Capabilities:** 
**Hidden Resources:** 
**Vulnerabilities:** 
**Emergency Protocols:** 
<!-- DM_END -->
```

---

## 2. Creature/Wildlife Template

```yaml
---
access_level: dm
type: creature
name: "Creature Name"
habitat: "[[Primary Location]]"
cr: 3
creature-type: beast  # beast, monstrosity, aberration, etc.
size: medium
alignment: neutral
magical-properties: true
remnant-affected: true
threat-level: moderate  # minimal, low, moderate, high, extreme
ecological-role: "Apex predator, contamination indicator"
intelligence-level: animal  # animal, low, average, high
social-structure: pack  # solitary, pair, pack, herd, colony
conservation-status: stable  # extinct, endangered, rare, uncommon, stable, abundant
economic-value: "Hide and bones used for protective equipment"
status: active
importance: minor
last-updated: 2024-01-15
tags:
  - creature
  - wildlife
  - contaminated
  - forest-dweller
  - predator
---
```

**Creature Template Body:**
```markdown
# Creature Name
*Brief description and ecological role*

<!-- PLAYER_SAFE_START -->
## Basic Information
**Size:** Medium beast
**Habitat:** Contaminated forests and ruins
**Behavior:** Pack hunters, primarily nocturnal
**Danger Level:** Moderate threat to travelers

## Physical Description
Detailed appearance, including any visible mutations or unusual features from Remnant exposure.

## Behavior Patterns
- Hunting strategies and social behavior
- Territorial ranges and seasonal movements
- Interaction with other species and humanoids
- Signs of their presence travelers might notice

## Cultural Significance
How local communities view this creature - feared, respected, harvested, protected, etc.
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
## DM-Only Details

### Combat Tactics & Abilities
**Preferred Strategy:** 
**Special Attacks:** 
**Weaknesses:** 
**Pack Coordination:** 

### Remnant Mutations
**Contamination Source:** 
**Mutation Effects:** 
**Progression Over Time:** 
**Transmission Risk:** 

### Ecological Impact
**Food Chain Position:** 
**Environmental Indicators:** 
**Population Trends:** 
**Threats to Ecosystem:** 

### Adventure Hooks
1. **Pack Territory Conflict:** Settlement expansion threatens hunting grounds
2. **Contamination Spread:** Creatures spreading to clean areas
3. **Scientific Interest:** Researchers want specimens for study

### Harvesting & Resources
**Valuable Materials:** Hide (contamination resistant), claws, glandular secretions
**Processing Requirements:** Specialized knowledge and safety equipment
**Market Value:** 50-200 gp depending on condition and buyer
**Legal Restrictions:** Some communities ban hunting, others encourage it
<!-- DM_END -->

## Stat Block
[Include standard D&D 5e stat block here]
```

---

## 3. Religion/Belief System Template

```yaml
---
access_level: player
type: religion
name: "Faith/Belief System Name"
pantheon: "[[Post-Cataclysm Folk Beliefs]]"
deity-type: concept  # deity, saint, concept, ancestor, nature-spirit
domains: ["healing", "community", "protection", "renewal"]
alignment: neutral-good
worship-style: "Community rituals, personal devotion"
clergy-structure: "Informal healers and community leaders"
sacred-locations: ["[[Temple of Renewal]]", "[[Memorial Gardens]]"]
followers: ["[[Healing Circle]]", "[[Community Leaders]]"]
holy-symbols: "Intertwined hands around a sprouting seed"
sacred-texts: "The Survivor's Testament, community oral traditions"
religious-holidays: ["Renewal Day", "Memorial Vigil", "Harvest Thanks"]
relationship-to-cataclysm: "Emerged from community healing efforts"
status: active
importance: major
region: "[[Port Zephyr Region]]"
last-updated: 2024-01-15
tags:
  - religion
  - community-healing
  - post-cataclysm
  - folk-belief
  - renewal
---
```

**Religion Template Body:**
```markdown
# Faith/Belief System Name
*Central tenet or primary focus*

<!-- PLAYER_SAFE_START -->
## Core Beliefs
What followers believe about the divine, morality, the afterlife, and how to live a good life.

## Worship & Practice
- Daily devotional practices
- Community rituals and ceremonies
- Life milestone celebrations (birth, coming of age, marriage, death)
- Seasonal observances and holy days

## Organization & Clergy
How the faith is structured, who leads it, and what roles different practitioners play.

## Sacred Sites & Symbols
Important places of worship, pilgrimage sites, holy symbols, and religious artifacts.

## Relationship to Post-Cataclysm Life
How this belief system addresses the challenges of living in a contaminated, rebuilding world.
<!-- PLAYER_SAFE_END -->

<!-- DM_START -->
## DM-Only Information

### Political Influence
**Government Connections:** 
**Factional Alliances:** 
**Political Opponents:** 
**Hidden Agendas:** 

### Secret Doctrines
**Esoteric Knowledge:** 
**Hidden Prophecies:** 
**Forbidden Texts:** 
**Mystery Traditions:** 

### Clerical Powers & Miracles
**Divine Magic Access:** Which spells and abilities are granted
**Miraculous Events:** Documented supernatural occurrences
**Divine Interventions:** How the divine responds to crises
**Limitations:** What the faith cannot or will not do

### Internal Conflicts
**Doctrinal Disputes:** 
**Power Struggles:** 
**Heretical Movements:** 
**Reform Pressures:** 

### Adventure Hooks
1. **Sacred Relic Recovery:** Lost holy artifact needs retrieval
2. **Theological Dispute:** Different interpretations threaten community unity  
3. **Divine Mission:** The faithful receive a call to action
4. **Temple Politics:** Corruption or conspiracy within religious hierarchy

### Historical Secrets
**Pre-Cataclysm Connections:** 
**Founding Mysteries:** 
**Hidden Records:** 
**Covered-up Events:** 
<!-- DM_END -->
```

---

## 4. Adventure/Quest Template

```yaml
---
access_level: secret
type: adventure
name: "Adventure/Quest Name"
quest-giver: "[[Kaia Sunweaver]]"
quest-type: investigation  # investigation, rescue, exploration, diplomatic, combat, heist
level-range: "3-5"
estimated-sessions: 2-3
locations-involved: ["[[Port Zephyr]]", "[[Old Harbor]]", "[[Contaminated Warehouse]]"]
npcs-involved: ["[[Suspicious Merchant]]", "[[Harbor Authority Guard]]", "[[Witness]]"]
factions-affected: ["[[Remnant Keepers]]", "[[Trading Guild]]", "[[Imperial Agents]]"]
themes: ["moral-complexity", "environmental-danger", "community-protection"]
completion-status: in-progress  # planned, ready-to-start, in-progress, paused, complete
session-started: "Session 4"
sessions-completed: ["Session 4", "Session 5"]
treasure-budget: "500 gp equivalent"
primary-antagonist: "[[Corrupt Official]]"
success-conditions: "Identify contamination source, preserve community trust"
failure-consequences: "Contamination spreads, factional conflict escalates"
status: active
importance: major
last-updated: 2024-01-15
tags:
  - adventure
  - investigation
  - port-zephyr
  - contamination
  - faction-politics
---
```

**Adventure Template Body:**
```markdown
# Adventure/Quest Name
*Brief hook and central conflict*

## Adventure Summary
**Setup:** How the adventure begins and what draws the party in
**Central Conflict:** The main problem or challenge to overcome
**Stakes:** What happens if the party succeeds or fails

## Quest Structure

### Act 1: Investigation/Setup
**Scenes:**
1. **[Scene Name]** - Initial hook and information gathering
2. **[Scene Name]** - First complications and deeper mystery
3. **[Scene Name]** - Major revelation or turning point

### Act 2: Complications/Development
**Scenes:**
4. **[Scene Name]** - New obstacles or moral dilemmas
5. **[Scene Name]** - Factional conflicts emerge
6. **[Scene Name]** - Critical decision point

### Act 3: Climax/Resolution
**Scenes:**
7. **[Scene Name]** - Final confrontation or challenge
8. **[Scene Name]** - Consequences and resolution

## Key NPCs & Their Roles
- **[[Quest Giver]]** - Motivation, information, ongoing support
- **[[Primary Antagonist]]** - Goals, methods, resources
- **[[Key Witness/Info Source]]** - What they know, how to reach them
- **[[Potential Ally]]** - How they might help, what they want in return

## Locations & Environments
- **[[Primary Location]]** - Layout, hazards, opportunities, secrets
- **[[Secondary Location]]** - Connection to main plot, what's hidden here
- **[[Climax Location]]** - Final confrontation setup, environmental factors

## Faction Dynamics
**[[Faction A]]** wants [goal] because [motivation]
**[[Faction B]]** opposes this because [conflict]
**Party's role:** How player choices affect factional balance

## Environmental/Contamination Elements
**Remnant Hazards:** Specific contamination risks and protection needed
**Environmental Storytelling:** How the post-Cataclysm world shapes the adventure
**Cleanup/Restoration:** Opportunities for positive environmental impact

## Moral Complexity & Themes
**Ethical Dilemmas:** Difficult choices with no clear right answer
**Community Impact:** How adventure outcomes affect local population
**Long-term Consequences:** Ripple effects on the broader campaign

## Treasure & Rewards
**Material Rewards:** [Specific items, gold amounts, equipment]
**Social Rewards:** [Reputation gains, new contacts, faction standing]
**Information Rewards:** [Secrets learned, maps acquired, lore discovered]
**Story Rewards:** [Plot advancement, new opportunities, character development]

## Scaling Options
**For Lower Levels:** Simplify challenges, reduce combat encounters
**For Higher Levels:** Add complications, increase stakes, introduce subplots
**For Different Party Sizes:** Adjust encounter difficulty and support NPCs

## Connection to Campaign Themes
**Environmental Allegory:** How this adventure reflects real-world issues
**Community Resilience:** Ways the adventure showcases rebuilding efforts
**Institutional Corruption:** How systemic problems create or complicate the adventure
**Moral Complexity:** Ethical dimensions and difficult choices

## Session Notes & Progress Tracking
**Session [X]:** What happened, player decisions, consequences triggered
**Session [Y]:** New developments, NPC reactions, world changes
**Ongoing Effects:** How this adventure continues to influence the campaign

## Follow-up Adventure Hooks
**Immediate Consequences:** Problems or opportunities created by this adventure
**Long-term Implications:** How this adventure affects future campaign developments
**Unresolved Threads:** Elements that could become future adventures
```

---

## 5. Faction Template

```yaml
---
access_level: dm
type: faction
name: "Faction Name"
faction-type: organization  # organization, government, religion, criminal, imperial, resistance
size: medium  # small, medium, large, massive
influence-level: regional  # local, regional, continental, global
leadership-structure: council  # individual, council, hierarchy, network, cult-of-personality
primary-goal: "Community protection and environmental restoration"
secondary-goals: ["Preserve pre-Cataclysm knowledge", "Resist imperial expansion"]
resources: ["Remnant detection technology", "Hidden supply networks", "Trained peacekeepers"]
territories: ["[[Port Zephyr]]", "[[Cerulean Reach]]", "[[Eastern Trade Routes]]"]
allied-factions: ["[[Harbor Authority]]", "[[Healing Circle]]"]
enemy-factions: ["[[Imperial Intelligence]]", "[[Rust Tide Pirates]]"]
neutral-factions: ["[[Trading Guild]]", "[[Wanderer Clans]]"]
public-reputation: "Respected community protectors"
secret-activities: "Information network, selective law enforcement"
recruitment-methods: "Community recommendation, demonstrated commitment"
internal-conflicts: "Transparency vs. security, local vs. regional focus"
status: active
importance: major
region: "[[Port Zephyr Region]]"
last-updated: 2024-01-15
tags:
  - faction
  - peacekeepers
  - environmental
  - secretive
  - community-focused
---
```

---

## Cross-Reference Dashboard Template

```markdown
# [Content Type] Consistency Dashboard

## Overview Statistics
```dataview
TABLE 
  count(rows) as "Total",
  choice(importance = "major", "🔴", choice(importance = "minor", "🟡", "⚪")) + " " + importance as "Priority Breakdown"
FROM #[content-type]
GROUP BY importance
```

## Status Tracking
```dataview
TABLE 
  last-updated as "Updated",
  region as "Region",
  importance as "Priority"
FROM #[content-type]
WHERE status = "active"
SORT last-updated ASC
```

## Regional Distribution
```dataview
TABLE 
  count(rows) as "Count",
  join(map(rows, (r) => "[" + r.importance + "] " + r.file.link), ", ") as "Elements"
FROM #[content-type]
GROUP BY region
```

## Consistency Issues
```dataview
LIST file.mtime as "Created"
FROM #[content-type]
WHERE !region OR !importance OR !status
```

## Orphaned Content
```dataview
LIST
FROM #[content-type]
WHERE length(file.inlinks) < 2
```
```

This system scales infinitely - you can add new content types by creating new templates with appropriate frontmatter fields and building corresponding dashboard queries. The cross-referencing becomes more powerful as you add more interconnected content!