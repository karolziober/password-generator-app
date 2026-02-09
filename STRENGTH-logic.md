## Feature: Password Strength Meter

### Description
The strength meter provides real-time visual feedback on the estimated strength of the password based on the user's selected options.

### Inputs
- Character length (integer, 0-20)
- Number of selected character types (0-4): uppercase, lowercase, numbers, symbols

### Strength Levels

| Level    | Criteria                                  | Label      | Color  | Bars |
|----------|-------------------------------------------|------------|--------|------|
| None     | Length is 0 OR no character types selected | *(empty)*  | -      | 0    |
| Too Weak | 1 character type selected, any length     | TOO WEAK!  | Red    | 1    |
| Weak     | 2 character types selected OR length < 8  | WEAK       | Orange | 2    |
| Medium   | 3 character types AND length >= 8         | MEDIUM     | Yellow | 3    |
| Strong   | 4 character types AND length >= 12        | STRONG     | Green  | 4    |

### Behavior
- Strength must update every time the user changes any input (slider or checkbox)
- Filled bars are solid with the level's color and no border
- Unfilled bars show a white border with no fill
- The level label text updates alongside the bars
- Higher criteria always take priority (e.g., 4 types but length 6 = WEAK, not STRONG)

### Edge cases
- All checkboxes unchecked: show no level, all bars empty
- Length 0 with checkboxes selected: show no level, all bars empty
