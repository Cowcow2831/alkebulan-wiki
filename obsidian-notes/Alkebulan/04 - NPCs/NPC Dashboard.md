---
access_level: secret
location_filter: ALL Locations
---
# NPC Dashboard

## All My NPCs
```dataview
TABLE 
  location as "Where",
  faction as "Side",
  attitude-party as "Attitude"
FROM ""
WHERE type = "npc"
SORT importance DESC, location ASC
```

---
## Characters by Location 
**Location Filter:** `INPUT[inlineSelect(option(ALL Locations), option([[Port Zephyr]]), option([[Thornhaven]])):location_filter]`
```dataview
TABLE name, location, faction, status
FROM #npc 
WHERE (this.location_filter = "ALL Locations" OR !this.location_filter OR location = this.location_filter)
SORT location ASC, name ASC
```

---

## Major Characters Only
```dataview
TABLE 
  location as "Where",
  faction as "Side", 
  last-appearance as "Last Seen"
FROM ""
WHERE type = "npc" AND importance = "major"
```

---

## Need to Finish These
```dataview
LIST
FROM #in-progress 
WHERE type = "npc"
```

---

## Recently Used
```dataview
TABLE location, faction, attitude-party
FROM ""
WHERE type = "npc" AND last-appearance
SORT last-appearance DESC
LIMIT 8
```

---