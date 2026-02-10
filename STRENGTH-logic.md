## Feature: Password Strength Meter

### Description
The strength meter provides real-time visual feedback on the estimated strength of the password based on the user's selected options using a point-based scoring system.

### Inputs
- Character length (integer, 8-20)
- Number of selected character types (0-4): uppercase, lowercase, numbers, symbols

### Scoring

**Character types** — +2 points per selected type (max 8 points):
| Uppercase | Lowercase | Numbers | Symbols |
|-----------|-----------|---------|---------|
| +2        | +2        | +2      | +2      |

**Password length** — points based on length range (max 3 points):
| Length | Points |
|--------|--------|
| 8–11   | +1     |
| 12–15  | +2     |
| 16–20  | +3     |

**Maximum possible score: 11** (4 types + length 16-20)

### Strength Levels

| Level    | Score  | Label      | Color  | Bars |
|----------|--------|------------|--------|------|
| None     | 0      | *(empty)*  | -      | 0    |
| Too Weak | 1–3    | TOO WEAK!  | Red    | 1    |
| Weak     | 4–6    | WEAK       | Orange | 2    |
| Medium   | 7–9    | MEDIUM     | Yellow | 3    |
| Strong   | 10–11  | STRONG     | Green  | 4    |

**A score of 0 occurs when no character types are selected** (regardless of length).

### Reference: example combinations

| Types | Length | Score | Level    |
|-------|--------|-------|----------|
| 1     | 8      | 3     | Too Weak |
| 1     | 15     | 4     | Weak     |
| 2     | 8      | 5     | Weak     |
| 2     | 16     | 7     | Medium   |
| 3     | 8      | 7     | Medium   |
| 3     | 12     | 8     | Medium   |
| 4     | 8      | 9     | Medium   |
| 4     | 12     | 10    | Strong   |
| 4     | 16     | 11    | Strong   |

### Behavior
- Strength must update every time the user changes any input (slider or checkbox)
- Filled bars are solid with the level's color and no border
- Unfilled bars show a white border with no fill
- The level label text updates alongside the bars

### Edge cases
- All checkboxes unchecked: score is 0, show no level, all bars empty
