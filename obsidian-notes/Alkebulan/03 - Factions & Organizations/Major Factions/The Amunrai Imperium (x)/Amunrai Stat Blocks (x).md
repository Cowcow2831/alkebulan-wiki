---
type: stat_blocks
faction: Amunrai Imperium
campaign: Alkebulan
tags: [stat-blocks, amunrai, imperium, military]
---

# Amunrai Imperium Stat Blocks

## Overview
Generic stat blocks for Amunrai Imperium forces, from basic soldiers to elite Sunchild operatives. These can be used across multiple adventures and scaled as needed.

---

## Imperium Scout

```statblock
creature: Imperium Scout
name: Imperium Scout
size: medium
type: humanoid
subtype: any race
alignment: lawful neutral
ac: 13
hp: 16
hit_dice: 3d8+3
speed: 30 ft.
stats:
  - 11
  - 14
  - 12
  - 11
  - 13
  - 11
skillsaves:
  - Nature +3
  - Perception +5
  - Stealth +6
  - Survival +5
damage_resistances: 
damage_immunities: 
senses: passive Perception 15
languages: Common, Ancient Amunrai
cr: 1/2
traits:
  - name: Keen Hearing and Sight
    desc: The scout has advantage on Wisdom (Perception) checks that rely on hearing or sight.
actions:
  - name: Multiattack
    desc: The scout makes two melee attacks or two ranged attacks.
  - name: Shortsword
    desc: Melee Weapon Attack. +4 to hit, reach 5 ft., one target. Hit 5 (1d6 + 2) piercing damage.
  - name: Longbow
    desc: Ranged Weapon Attack. +4 to hit, range 150/600 ft., one target. Hit 6 (1d8 + 2) piercing damage.
creature: Imperium Scout
```

---

## Imperium Guard

```statblock
creature: Imperium Guard
name: Imperium Guard
size: medium
type: humanoid
subtype: any race
alignment: lawful neutral
ac: 16
hp: 32
hit_dice: 5d8+10
speed: 30 ft.
stats:
  - 15
  - 11
  - 14
  - 10
  - 11
  - 10
skillsaves:
  - Athletics +4
  - Intimidation +2
damage_resistances: 
damage_immunities: 
senses: passive Perception 10
languages: Common, Ancient Amunrai
cr: 1
traits:
  - name: Formation Fighting
    desc: The guard has advantage on attack rolls against a creature if at least one of the guard's allies is within 5 feet of the creature and the ally isn't incapacitated.
actions:
  - name: Multiattack
    desc: The guard makes two spear attacks.
  - name: Spear
    desc: Melee or Ranged Weapon Attack. +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack.
  - name: Shield Bash
    desc: Melee Weapon Attack. +4 to hit, reach 5 ft., one creature. Hit 4 (1d4 + 2) bludgeoning damage. If the target is Medium or smaller, it must succeed on a DC 12 Strength saving throw or be knocked prone.
creature: Imperium Guard
```

---

## Sunchild Battle Mage

```statblock
creature: Sunchild Battle Mage
name: Sunchild Battle Mage
size: medium
type: humanoid
subtype: sunchild
alignment: lawful neutral
ac: 14
hp: 58
hit_dice: 9d8+18
speed: 30 ft.
stats:
  - 10
  - 14
  - 15
  - 16
  - 13
  - 18
skillsaves:
  - Arcana +6
  - History +6
  - Religion +6
damage_resistances: radiant
damage_immunities: 
senses: passive Perception 11
languages: Common, Ancient Amunrai, Celestial
cr: 5
traits:
  - name: Sunlight Healing
    desc: While in direct sunlight, the mage regains 3 hit points at the start of each of its turns.
  - name: Solar Flare (1/Day)
    desc: As an action, the mage can cause all creatures of its choice within 15 feet to make a DC 15 Constitution saving throw or be blinded until the end of the mage's next turn.
  - name: Spellcasting
    desc: The mage is a 7th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). Cantrips (at will) fire bolt, light, mage hand, prestidigitation; 1st level (4 slots) burning hands, mage armor, shield; 2nd level (3 slots) scorching ray, misty step; 3rd level (3 slots) fireball, daylight, counterspell; 4th level (1 slot) wall of fire.
actions:
  - name: Dagger
    desc: Melee or Ranged Weapon Attack. +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit 4 (1d4 + 2) piercing damage.
  - name: Sunfire Blast
    desc: Ranged Spell Attack. +7 to hit, range 120 ft., one target. Hit 11 (2d6 + 4) radiant damage.
creature: Sunchild Battle Mage
```

---

## Imperium Captain

```statblock
creature: Imperium Captain
name: Imperium Captain
size: medium
type: humanoid
subtype: any race
alignment: lawful neutral
ac: 18
hp: 78
hit_dice: 12d8+24
speed: 30 ft.
stats:
  - 16
  - 11
  - 14
  - 12
  - 13
  - 15
skillsaves:
  - Athletics +6
  - Intimidation +5
  - Perception +4
damage_resistances: 
damage_immunities: 
senses: passive Perception 14
languages: Common, Ancient Amunrai
cr: 4
traits:
  - name: Action Surge (Recharges after a Short or Long Rest)
    desc: On his turn, the captain can take one additional action.
  - name: Rally Troops
    desc: As a bonus action, the captain can give a command to all allied creatures within 30 feet that can hear him. Each creature can use its reaction to move up to half its speed or make one weapon attack.
actions:
  - name: Multiattack
    desc: The captain makes three melee attacks.
  - name: Longsword
    desc: Melee Weapon Attack. +6 to hit, reach 5 ft., one target. Hit 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.
  - name: Heavy Crossbow
    desc: Ranged Weapon Attack. +3 to hit, range 100/400 ft., one target. Hit 5 (1d10) piercing damage.
reactions:
  - name: Parry
    desc: The captain adds 3 to his AC against one melee attack that would hit him. To do so, the captain must see the attacker and be wielding a melee weapon.
creature: Imperium Captain
```

---

## Imperium Desert Expedition (Level 6 Encounter)

**For Whispers of the Wastes Adventure:**
- 1 Sunchild Battle Mage (leader)
- 2 Imperium Guards 
- 1 Imperium Scout

**Tactics:** The scout attempts to remain hidden and provide ranged support. Guards flank and protect the mage, who focuses on area-of-effect spells. The mage attempts to negotiate first, claiming Imperial authority over the artifact.

**Alternative Composition (Stronger):**
- 1 Imperium Captain
- 1 Sunchild Battle Mage  
- 3 Imperium Guards

---

## Modification Guidelines

**Desert Modifications:**
- All Imperium forces carry extra water and desert gear
- Scouts gain advantage on Survival checks in desert terrain
- Mages prepare additional fire/heat protection spells

---

## Notes

These stat blocks represent professional Imperium forces, not conscripts. They're disciplined, well-equipped, and loyal to the empire. In the desert, they're operating far from home and may be more willing to negotiate than fight to the death, especially if facing overwhelming odds.

**Roleplay Notes:**
- Imperium forces believe in their divine mandate to rule
- They view most other cultures as primitive but not necessarily evil
- Professional soldiers who follow orders but aren't mindless
- May offer terms or try to recruit capable opponents