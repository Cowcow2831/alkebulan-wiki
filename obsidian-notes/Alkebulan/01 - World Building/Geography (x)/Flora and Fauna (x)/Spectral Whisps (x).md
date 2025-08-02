---
type: creature
habitat: deserts
cr: varies
status: enigmatic
campaign: Alkebulan
tags:
  - creature
  - spectral
  - remnant
  - desert
  - intelligent
  - swarm
---

# Spectral Whisps

## Basic Info
**Type:** Undead (incorporeal) / Aberration
**Size:** Varies (Tiny to Huge)
**Habitat:** [[The Whispering Wastes]], [[Remnant Zones]], [[Desert]] regions
**Challenge Rating:** 1/4 (individual), 3 (swarm), 8 (engorged)
**Conservation Status:** Unknown (possibly fragments of lost souls)

## Description

Enigmatic translucent entities that flow through the desert like living mist, ranging from tiny wisps no larger than a candle flame to massive cloudlike formations that dwarf buildings. Their ethereal forms shift between states of matter, appearing as flowing smoke, shimmering heat mirages, or condensed starlight. Colors shift based on remnant energy density - pale blues and whites in low-magic areas, deep purples and golds near strong magical sources, and occasionally prismatic rainbow hues when feeding on particularly potent remnant energy.

## Behavior
**Social Structure:** Exist as individuals, swarms, or merged collective entities
**Diet:** Feed on remnant magical energy, ambient emotions, and memory fragments
**Activity Pattern:** Most active during dawn, dusk, and during magical storms
**Communication:** Harmonic humming that creates the desert's whispers, containing fragments of ancient knowledge

## Magical Properties
- Incorporeal beings that exist partially in the material and ethereal planes
- Can merge temporarily to form larger structures or conduits of pure magical energy
- Absorb and process remnant energy, sometimes becoming supercharged
- Their humming contains fragments of pre-Cataclysm memories and knowledge
- Can manipulate sand and wind through concentrated will
- Phase between visible and invisible states based on magical energy availability

## Ecological Role
- Natural processors of dangerous remnant energy concentrations
- Living repositories of historical knowledge and memories
- Create the characteristic "whispers" of the Whispering Wastes
- Maintain magical balance in desert ecosystems
- Serve as indicators of remnant energy density and magical storms

## Cultural Significance
**Symbolism:** Memory, lost souls, ancient wisdom, the price of magical hubris
**Economic Value:** Whisp essence can be crystallized for magical components
**Interaction with Civilized Races:** The [[Whisp Dancers]] tribe can communicate with and partially control them

## Variants & Subspecies
- **Collective Whisps:** Merged entities displaying heightened intelligence
- **Void Whisps:** Rare dark variants that absorb light and sound

## Game Statistics
**Speed:** 30 ft. flying (hover), incorporeal movement
**Key Abilities:** Incorporeal, magic resistance, memory fragments
**Special Traits:** Merge/split abilities, remnant detection, harmonic resonance
**Immunities/Resistances:** Immune to physical damage, resistant to most magic

## Harvesting & Materials
- **Crystallized Essence:** Used in divination magic and memory restoration
- **Whisp Resonance Crystals:** Navigation aids for desert travel
- **Memory Fragments:** Contain historical knowledge and lost spells
- **Harmonic Frequencies:** Can be captured and used for communication

## Adventure Hooks
- **The Silent Zone:** Area where whisps have vanished, investigating reveals dangerous remnant buildup
- **Memory Theft:** Whisps containing crucial historical knowledge are being harvested illegally
- **The Great Convergence:** Multiple whisp entities are merging into something unprecedented
- **Whisp Guidance:** Ancient whisps offer to guide party to hidden ruins in exchange for feeding them magical energy

## Threats & Predators
- Remnant energy overload can cause whisps to become hostile
- [[Void Ravens]] occasionally hunt smaller whisps
- Magical disruption can cause them to lose cohesion
- Over-harvesting by collectors threatens local populations

## Stat Block

### Individual Spectral Whisp

```statblock
creature: Spectral Whisp
name: Spectral Whisp
size: tiny
type: undead
subtype: incorporeal
alignment: neutral
ac: 12
hp: 7
hit_dice: 2d4+2
speed: 0 ft., fly 30 ft. (hover)
stats:
  - 1
  - 14
  - 12
  - 10
  - 13
  - 11
damage_resistances: Acid, Cold, Fire, Lightning, Thunder; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks
damage_immunities: Necrotic, Poison
condition_immunities: Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
senses: Darkvision 60 ft., Passive Perception 11
languages: --
cr: 1/4
traits:
  - name: Incorporeal Movement
    desc: The whisp can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Memory Fragment
    desc: When the whisp is destroyed, any creature within 10 feet must make a DC 11 Wisdom saving throw or be stunned until the end of their next turn as they experience a brief, vivid memory from the past.
  - name: Remnant Sense
    desc: The whisp can detect sources of remnant magical energy within 120 feet.
actions:
  - name: Whisper Touch
    desc: Melee Spell Attack. +3 to hit, reach 5 ft., one target. Hit 4 (1d6+1) psychic damage, and the target must succeed on a DC 11 Wisdom saving throw or have disadvantage on their next attack roll as distracting whispers fill their mind.
creature: Spectral Whisp
```

### Spectral Whisp Swarm

```statblock
creature: Spectral Whisp Swarm
name: Spectral Whisp Swarm
size: medium
type: undead
subtype: swarm of tiny undead
alignment: neutral
ac: 13
hp: 45
hit_dice: 10d8
speed: 0 ft., fly 40 ft. (hover)
stats:
  - 3
  - 16
  - 10
  - 12
  - 14
  - 13
damage_resistances: Acid, Cold, Fire, Lightning, Thunder; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks
damage_immunities: Necrotic, Poison
condition_immunities: Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
senses: Darkvision 60 ft., Passive Perception 12
languages: --
cr: 3
traits:
  - name: Incorporeal Movement
    desc: The swarm can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and can move through any opening large enough for a Tiny whisp. The swarm can't regain hit points or gain temporary hit points.
  - name: Memory Cascade
    desc: When the swarm takes damage, all creatures within 15 feet must make a DC 13 Wisdom saving throw or be overwhelmed by fragmented memories, becoming incapacitated until the end of their next turn.
  - name: Harmonic Resonance
    desc: The swarm's humming can be heard up to 1 mile away. Creatures within 30 feet have advantage on Investigation checks to recall historical information.
actions:
  - name: Whisper Storm
    desc: The swarm engulfs a 10-foot radius area. Each creature in the area must make a DC 13 Constitution saving throw, taking 14 (4d6) psychic damage on failure, or half as much on success. Affected creatures hear overlapping whispers of ancient conversations.
  - name: Memory Drain
    desc: Melee Spell Attack. +5 to hit, reach 0 ft., one creature in the swarm's space. Hit 10 (3d6) psychic damage, and the target must make a DC 13 Wisdom saving throw. On failure, the swarm regains 5 hit points as it feeds on the target's memories.
creature: Spectral Whisp Swarm
```

### Engorged Spectral Whisp

```statblock
creature: Engorged Spectral Whisp
name: Engorged Spectral Whisp
size: huge
type: undead
subtype: incorporeal
alignment: neutral
ac: 15
hp: 136
hit_dice: 16d12+32
speed: 0 ft., fly 50 ft. (hover)
stats:
  - 6
  - 18
  - 14
  - 16
  - 17
  - 15
damage_resistances: Acid, Cold, Fire, Lightning, Thunder; Bludgeoning, Piercing, and Slashing from Nonmagical Attacks
damage_immunities: Necrotic, Poison
condition_immunities: Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
senses: Darkvision 120 ft., Truesight 60 ft., Passive Perception 13
languages: Common, Telepathy 120 ft.
cr: 8
traits:
  - name: Incorporeal Movement
    desc: The whisp can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Legendary Resistance (3/Day)
    desc: If the whisp fails a saving throw, it can choose to succeed instead.
  - name: Remnant Overload
    desc: The whisp is supercharged with remnant energy. Its spell attacks have advantage, and creatures that start their turn within 20 feet take 5 (1d10) force damage from residual magical energy.
  - name: Ancient Memory
    desc: The whisp contains vast repositories of pre-Cataclysm knowledge. It can cast Divination spells as if it were a 10th-level spellcaster (spell save DC 14).
  - name: Split
    desc: When reduced to 68 hit points or fewer, the whisp splits into two Medium spectral whisp swarms with full hit points.
actions:
  - name: Multiattack
    desc: The engorged whisp makes two Remnant Lash attacks.
  - name: Remnant Lash
    desc: Ranged Spell Attack. +7 to hit, range 60 ft., one target. Hit 18 (3d8+4) force damage plus 9 (2d8) psychic damage. The target must make a DC 15 Wisdom saving throw or be stunned until the end of their next turn.
  - name: Memory Storm (Recharge 5-6)
    desc: The whisp creates a 30-foot radius storm of swirling memories centered on a point within 120 feet. Each creature in the area must make a DC 15 Wisdom saving throw. On failure, they take 28 (8d6) psychic damage and are incapacitated for 1 minute as they experience vivid hallucinations of the past. On success, they take half damage and are not incapacitated. Affected creatures can repeat the save at the end of each turn.
  - name: Commune with Past (1/Day)
    desc: The whisp taps into ancient memories. This functions as the Commune spell, but answers relate to historical events from before the Cataclysm.
legendary_actions:
  - name: Move
    desc: The whisp moves up to its speed without provoking opportunity attacks.
  - name: Whisper Touch
    desc: The whisp makes one Remnant Lash attack.
  - name: Memory Fragment (Costs 2 Actions)
    desc: The whisp targets one creature within 60 feet. The target must make a DC 15 Wisdom saving throw or be charmed for 1 minute as they become lost in ancient memories.
creature: Engorged Spectral Whisp
```

## Notes
- Whisps may be fragments of souls lost during the Cataclysm, containing memories of ancient empires
- They serve as natural early warning systems for dangerous remnant energy buildup
- The [[Whisp Dancers]] tribe has developed techniques to communicate with and guide whisps
- During magical storms, individual whisps often merge into larger, more intelligent entities
- Their harmonic humming can be used for long-distance communication across the desert
- Some scholars believe all whisps are connected in a continent-spanning consciousness