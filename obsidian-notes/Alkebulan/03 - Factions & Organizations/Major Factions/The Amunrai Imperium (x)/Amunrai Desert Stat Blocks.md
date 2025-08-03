---
access_level: dm
type:
  - stat_blocks
  - enemies
faction: Amunrai Imperium
campaign: Alkebulan
tags:
  - stat-blocks
  - amunrai
  - imperium
  - military
  - whispers-of-wastes
  - contamination-gear
---

# Amunrai Stat Blocks - Desert Forces

<!-- DM_START -->
## Overview
Stat blocks for [[The Amunrai Imperium]] forces specifically equipped for desert environments. 

**Key Themes:**
- **Professional Exploitation**: Well-equipped forces vs. contamination-exposed locals
- **Environmental Inequality**: Imperial protection gear vs. expendable worker exposure
- **Institutional Authority**: Legitimate-seeming operations hiding systematic exploitation
- **Resource Extraction**: Military backing for contamination-based commerce

---

## Imperial Desert Soldiers

*Professional troops equipped for contamination work*

```statblock
creature: Imperial Desert Soldier
name: Imperial Desert Soldier
size: medium
type: humanoid
subtype: any race
alignment: lawful neutral (believes in legitimate mission)
ac: 16 (chain mail + contamination padding)
hp: 32
hit_dice: 5d8+10
speed: 30 ft.
stats:
  - 15
  - 12
  - 14
  - 10
  - 11
  - 10
skillsaves:
  - Athletics +4
  - Intimidation +2
  - Survival +2
damage_resistances: Necrotic (contamination gear)
condition_immunities: Poisoned (contamination protection)
senses: passive Perception 10
languages: Common, Ancient Amunrai
cr: 1
traits:
  - name: Contamination Gear
    desc: The soldier has advantage on Constitution saves against contamination and magical radiation. Equipment prevents contamination accumulation for 8 hours of exposure.
  - name: Formation Fighting
    desc: Advantage on attack rolls when ally within 5 feet of target and ally isn't incapacitated.
  - name: Imperial Authority
    desc: Can attempt to compel surrender by invoking Imperial law (DC 12 Charisma check, advantage against non-Imperial citizens).
actions:
  - name: Multiattack
    desc: The soldier makes two spear attacks.
  - name: Imperial Spear
    desc: Melee or Ranged Weapon Attack. +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used two-handed.
  - name: Shield Bash
    desc: Melee Weapon Attack. +4 to hit, reach 5 ft., one creature. Hit 4 (1d4 + 2) bludgeoning damage. Medium or smaller target makes DC 12 Strength save or be knocked prone.
  - name: Arrest Attempt
    desc: Melee attack with disadvantage to damage. On hit, target is grappled (escape DC 13) and soldier attempts to apply restraints.
creature: Imperial Desert Soldier
```

**Equipment:** Contamination-resistant armor, desert survival gear, restraints for "theft suspects"

**Motivation:** Believes they're recovering stolen Imperial property and maintaining law and order

**Tactics:** Attempt arrest before violence, use formation fighting, protect the mage

---

## Imperial Scout Mage

*Specialized detection and communication operative*

```statblock
creature: Imperial Scout Mage
name: Imperial Scout Mage
size: medium
type: humanoid
subtype: human
alignment: lawful neutral (research focused)
ac: 14 (mage armor + contamination robes)
hp: 58
hit_dice: 9d8+18
speed: 30 ft.
stats:
  - 10
  - 14
  - 15
  - 16
  - 13
  - 12
skillsaves:
  - Arcana +6
  - Investigation +6
  - Nature +4
damage_resistances: Necrotic (contamination gear)
condition_immunities: Poisoned (contamination protection)
senses: passive Perception 11
languages: Common, Ancient Amunrai, Draconic
cr: 3
traits:
  - name: Advanced Contamination Gear
    desc: Advantage on saves against contamination. Magical detection equipment functions despite environmental interference.
  - name: Temporal Detection
    desc: Can sense temporal disturbances within 1 mile.
  - name: Imperial Research Mission
    desc: Has detailed knowledge of Imperial temporal weapons research program and artifact identification.
  - name: Spellcasting
    desc: 5th-level spellcaster, Intelligence-based (DC 14, +6 to hit). Cantrips (at will) detect magic, mage hand, minor illusion, prestidigitation; 1st level (4 slots) identify, mage armor, shield; 2nd level (3 slots) detect thoughts, misty step, suggestion; 3rd level (2 slots) clairvoyance, counterspell, sending.
actions:
  - name: Quarterstaff
    desc: Melee Weapon Attack. +2 to hit, reach 5 ft., one target. Hit 3 (1d6) bludgeoning damage, or 4 (1d8) bludgeoning damage if used two-handed.
  - name: Temporal Trace
    desc: Ranged Spell Attack. +6 to hit, range 60 ft., one target. Hit 7 (1d8 + 3) force damage. If target has been exposed to temporal magic, takes additional 1d6 psychic damage.
  - name: Communication Relay (1/Day)
    desc: Sends detailed report to Imperial command about artifact status and recovery progress using magical communication network.
reactions:
  - name: Counterspell
    desc: Attempts to counter spell of 3rd level or lower within 60 feet (uses spell slot if higher level).
  - name: Magical Analysis
    desc: When magical effect occurs within 30 feet, can use reaction to identify its school and approximate power level.
creature: Imperial Scout Mage
```

**Equipment:** Temporal detection crystals, communication devices, comprehensive contamination protection

**Motivation:** Genuinely believes artifacts should be studied in proper Imperial research facilities for safety

**Knowledge:** Knows about Imperial temporal weapons program but believes it's defensive research


---

## Desert Recovery Encounter (CR 5)

**Standard Imperial Force:**
- 1 Imperial Scout Mage  
- 4 Imperial Desert Soldiers

**Encounter Dynamics:**
- **Initial Approach**: Professional, legal authority, attempts negotiation
- **Escalation**: Arrest attempts before violence
- **Combat Tactics**: Formation fighting, protect mage, attempt non-lethal takedowns
- **Retreat Conditions**: If outnumbered 3:1


## Environmental Context

### Contamination Inequality
**Imperial Forces:**
- Complete protection from magical radiation
- Sealed suits preventing contamination accumulation
- Medical support and decontamination available
- Renewable protective equipment

**Local Workers/Opposition:**
- Minimal or no contamination protection
- Accumulated exposure from years of desert survival
- No medical support for contamination sickness
- Must choose between exposure and starvation

### Imperial Legitimacy
**Legal Authority:**
- Genuine warrants for "stolen Imperial property"
- Professional conduct and proper legal procedures
- Belief in legitimate recovery mission
- Documentation and official orders

**Hidden Agenda:**
- Artifact destined for weapons research facility
- No disclosure of temporal weapon nature
- Expendable local labor for dangerous extraction
- Systematic covering up of temporal weapon casualties

## Roleplay Guidelines

### Imperial Scout Mage
**Personality:** Academic, research-focused, believes in proper scientific study
**Approach:** Emphasizes safety concerns, artifact expertise, research value
**Hidden Knowledge:** Knows about Imperial research but believes it's defensive
**Moral Conflict:** Genuinely concerned about artifact safety

**Key Dialogue:**
- *"These artifacts require specialized containment protocols."*
- *"Improper handling could result in catastrophic magical discharge."*
- *"Imperial facilities are equipped for safe temporal research."*
- *"We're here to prevent another magical disaster."*

### Imperial Desert Soldiers
**Personality:** Professional, disciplined, follows orders without question
**Approach:** Maintain formation, protect leadership, attempt arrests
**Hidden Knowledge:** Believe they're preventing theft and maintaining order
**Moral Conflict:** Would question orders if they understood true Imperial agenda

## Combat Tactics

### Phase 1: Negotiation
- Attempts to establish legal authority
- Mage explains safety concerns about artifact
- Soldiers maintain ready position but don't threaten
- Offer terms: return artifact, no charges filed

### Phase 2: Arrest Attempts
- Soldiers attempt non-lethal takedowns
- Mage uses *suggestion* and *hold person*
- Focus on restraining rather than killing

### Phase 3: Combat
- Formation fighting with soldiers protecting mage
- Mage uses *counterspell* and battlefield control
- Retreat if situation becomes untenable

## Adventure Integration

### "Whispers of the Wastes" Timing
**Early Arrival**: During Act 2 investigation, adds time pressure
**Late Arrival**: During Act 3 choice, forces immediate decision
**Ongoing Presence**: Shadowing party throughout adventure

### Moral Complexity
- **Legitimate Authority**: They have legal right to the artifact
- **Professional Conduct**: Follow proper procedures and military discipline
- **Hidden Agenda**: Don't understand true Imperial temporal weapons program
- **Environmental Inequality**: Complete protection while locals suffer exposure

### Resolution Options
- **Negotiated Surrender**: Party returns artifact, receives compensation
- **Jurisdictional Dispute**: Claim Port Zephyr authority over regional artifacts
- **Combat Victory**: Defeat Imperial forces, but face future retaliation
- **Diplomatic Solution**: Joint custody or neutral containment agreement

*Note: These Imperial forces represent professional military conducting what they believe is legitimate recovery operation. Their true tragedy is serving as enforcers for systematic temporal exploitation while believing they're maintaining law and preventing magical disasters.*
<!-- DM_END -->