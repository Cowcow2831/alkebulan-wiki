---
access_level: secret
---

# 🔥 <% tp.system.prompt("Character Name") %>

_Knight of the Order of Desolation_

---

## ⚔️ Basic Information

|Field|Value|
|---|---|
|**Class & Level**|Illrigger • Level <% tp.system.prompt("Character Level", "1") %>|
|**Race**|<% tp.system.prompt("Race") %>|
|**Background**|<% tp.system.prompt("Background") %>|
|**Alignment**|<% tp.system.prompt("Alignment") %>|
|**Archdevil Patron**|<% tp.system.suggester(["Asmodeus (Lord of Lies)", "Moloch (The Tyrant)", "Dispater (Iron Duke)", "Sutekh (Lord of Blood)", "Belial (Pale Kiss)"], ["Asmodeus", "Moloch", "Dispater", "Sutekh", "Belial"]) %>|
|**Diabolic Contract**|<% tp.system.suggester(["Architect of Ruin", "Hellspeaker", "Painkiller", "Sanguine Knight", "Shadowmaster"], ["Architect of Ruin", "Hellspeaker", "Painkiller", "Sanguine Knight", "Shadowmaster"]) %>|
|**Experience Points**|0|

---

## 📊 Ability Scores & Saves

|Ability|Score|Modifier|Proficient|Saving Throw|
|---|---|---|---|---|
|**Strength**|<% tp.system.prompt("Strength", "10") %>|+0|☐|+0|
|**Dexterity**|<% tp.system.prompt("Dexterity", "10") %>|+0|☐|+0|
|**Constitution**|<% tp.system.prompt("Constitution", "10") %>|+0|✓|+0|
|**Intelligence**|<% tp.system.prompt("Intelligence", "10") %>|+0|☐|+0|
|**Wisdom**|<% tp.system.prompt("Wisdom", "10") %>|+0|☐|+0|
|**Charisma**|<% tp.system.prompt("Charisma", "10") %>|+0|✓|+0|

> **Proficiency Bonus:** +2  
> **Interdict Save DC:** 8 + Prof + Cha Mod = ___

---

## ⚡ Combat Statistics

|Stat|Value|
|---|---|
|**Armor Class**|<% tp.system.prompt("Armor Class", "10") %>|
|**Hit Points**|Current: _____ / Maximum: _____|
|**Hit Dice**|___d10|
|**Speed**|30 ft|
|**Initiative**|+___|

### 🗡️ Combat Mastery

**Chosen Mastery:** <% tp.system.suggester(["Bravado (AC = 10 + Dex + Cha)", "Brutal (Move targets with 2H weapons)", "Inexorable (+1 save per adjacent enemy)", "Lies (Use Cha for weapon attacks)", "Lissome (Move 5ft after melee hit)", "Unfettered (60ft seal range)"], ["Bravado", "Brutal", "Inexorable", "Lies", "Lissome", "Unfettered"]) %>

---

## 🔥 Illrigger Features

### Baleful Interdict

- **Seals Available:** _____ / _____
- **Seal Damage:** ___d6 fire or necrotic per seal burned
- **Range:** 30 feet (60 feet with Unfettered mastery)

_Place seals by hitting with weapon attacks or as bonus action. Burn seals when target takes damage from other sources._

### Invoke Hell Options _(3rd Level)_

**Uses:** 1 / Short Rest

1. **_____________** -
2. **_____________** -

### Infernal Conduit _(6th Level)_

- **Conduit Dice:** ___d10 available
- **Invigorate:** Ally heals, you take necrotic damage
- **Devour:** Deal necrotic, heal yourself

---

## 🎯 Skills & Proficiencies

_Choose 2 from: Arcana, Athletics, Deception, Insight, Intimidation, Investigation, Persuasion, Religion, Stealth_

**Chosen Skills:** <% tp.system.prompt("Skill 1") %> and <% tp.system.prompt("Skill 2") %>

|Skill|Ability|Prof|Modifier|
|---|---|---|---|
|Acrobatics|Dex|☐|+0|
|Animal Handling|Wis|☐|+0|
|**Arcana**|Int|☐|+0|
|**Athletics**|Str|☐|+0|
|**Deception**|Cha|☐|+0|
|History|Int|☐|+0|
|**Insight**|Wis|☐|+0|
|**Intimidation**|Cha|☐|+0|
|**Investigation**|Int|☐|+0|
|Medicine|Wis|☐|+0|
|Nature|Int|☐|+0|
|Perception|Wis|☐|+0|
|Performance|Cha|☐|+0|
|**Persuasion**|Cha|☐|+0|
|**Religion**|Int|☐|+0|
|Sleight of Hand|Dex|☐|+0|
|**Stealth**|Dex|☐|+0|
|Survival|Wis|☐|+0|

### Other Proficiencies

- **Armor:** Light, Medium, Shields
- **Weapons:** Simple, Martial
- **Languages:** Common, Infernal + <% tp.system.prompt("Additional Languages", "2") %> others
- **Tools:** <% tp.system.prompt("Tools", "None") %>

---

## 🗡️ Weapons & Attacks

|Weapon|Attack Bonus|Damage|Range|Properties|
|---|---|---|---|---|
|<% tp.system.prompt("Primary Weapon") %>|||||
|<% tp.system.prompt("Secondary Weapon", "None") %>|||||
||||||

### 🛡️ Armor & Equipment

- **Current Armor:** <% tp.system.prompt("Armor") %>
- **Shield:** <% tp.system.prompt("Shield", "None") %>
- **Currency:** CP: 0 SP: 0 GP: <% tp.system.prompt("Starting Gold", "50") %> PP: 0

**Starting Equipment:**

- <% tp.system.prompt("Equipment 1") %>
- <% tp.system.prompt("Equipment 2") %>
- <% tp.system.prompt("Equipment 3") %>
- <% tp.system.prompt("Equipment 4", "None") %>
- <% tp.system.prompt("Equipment 5", "None") %>

---

## 🔮 Interdict Boons

_Known Boons: _____ total_

### Available by Level

**2nd Level Boons:**

- ☐ **Abating Seal** - Reduce damage as reaction (1d10 + half illrigger level)
- ☐ **Bedevil** - Target gets -Prof bonus on next save when seal burned
- ☐ **Soul Eater** - Gain temp HP equal to illrigger level when burning seals
- ☐ **Styx's Apathy** - Target can't take reactions until end of next turn
- ☐ **Swift Retribution** _(Passive)_ - OA without using reaction vs interdicted

**7th Level Boons:**

- ☐ **Acheron's Chain** - Pull 10ft or grapple when placing seals (Str save)
- ☐ **Conflagrant Channel** - Teleport 60 ft as bonus action (costs 1 seal)
- ☐ **Eyes of the Gate** - Bind awareness to creature, see through their senses
- ☐ **Shadow Shroud** - +2 AC for 1 minute (costs 1 seal, bonus action)
- ☐ **Unleash Hell** - AoE damage around seal target when burned (reaction)
- ☐ **Vengeful Shot** - Reaction ranged attack when you/ally hit by ranged

**13th Level Boons:**

- ☐ **Dis's Onslaught** _(Passive)_ - Make weapon attack when placing/moving seals
- ☐ **Flash of Brimstone** - Teleport within 5ft of seal target when placing/moving
- ☐ **Hellish Frenzy** - Double speed, +2 AC, extra attack (costs 1 seal, bonus action)
- ☐ **Hellsight** - Truesight 60ft for 1 hour (costs 1 seal, action)
- ☐ **Iron Gaol** - Banish to Hell for 1 minute (costs 4 seals, Cha save)
- ☐ **Last Word** - Explode when dropped to 0 HP (costs up to 3 seals)

---

## ✨ Spellcasting _(Architect of Ruin Only)_

- **Spellcasting Ability:** Charisma
- **Spell Save DC:** 8 + Prof + Cha = ___
- **Spell Attack Bonus:** Prof + Cha = +___
- **Spellcasting Focus:** Unholy Symbol

### Spell Slots

|Level|Slots|Used|
|---|---|---|
|**Cantrips**|___ Known|—|
|**1st**|_____|☐☐☐☐|
|**2nd**|_____|☐☐☐|
|**3rd**|_____|☐☐☐|
|**4th**|_____|☐|

### Known Spells

**Recommended Cantrips:** chill touch, fire bolt, hellfire, minor illusion, thaumaturgy, vengeful blade

**Recommended 1st Level:** bane, charm person, hellish rebuke, shield, silent image

**Recommended 2nd Level:** blur, darkness, hold person, invisibility, suggestion

---

## 🔱 Forked Tongue

_Languages you can speak (but not read/write) - change on long rest:_

1. **<% tp.system.prompt("Forked Tongue 1") %>**
2. **<% tp.system.prompt("Forked Tongue 2") %>**
3. **<% tp.system.prompt("Forked Tongue 3", "N/A until 9th level") %>**

**Advantage on Insight checks to determine intentions** _(9th level)_

---

## 👤 Character Details

### Personality

- **Traits:** <% tp.system.prompt("Personality Traits") %>
- **Ideals:** <% tp.system.prompt("Ideals") %>
- **Bonds:** <% tp.system.prompt("Bonds") %>
- **Flaws:** <% tp.system.prompt("Flaws") %>

### Backstory

_How did you come to serve your archdevil? What brought you into the Order of Desolation?_

<% tp.system.prompt("Backstory") %>

---

## 📝 Session Notes & Advancement

### Current Goals

- <% tp.system.prompt("Goal 1") %>
- <% tp.system.prompt("Goal 2") %>

### Important Notes

- **Seal Damage Increases:** Levels 5 (2d6), 11 (3d6), 20 (4d6)
- **ASI/Feats:** Levels 4, 8, 12, 16, 19
- **New Interdict Boons:** Levels 2, 7, 13, 18

### Session Log

|Session|Date|Notes|XP Gained|
|---|---|---|---|
|1||||
|2||||
|3||||

---

_"And Hell demands victory!"_  
_Template for The Illrigger Revised • MCDM Productions_