# Password Generator App

A responsive password generator that creates random passwords based on user-selected criteria with real-time strength feedback. Built as a solution to the [Frontend Mentor Password Generator App challenge](https://www.frontendmentor.io/challenges/password-generator-app-SG1KPkN9t).

![App Preview](./preview.jpg)

## Features

- **Password Generation** - Generate random passwords based on selected character types (uppercase, lowercase, numbers, symbols)
- **Character Length Control** - Adjustable slider (8-20 characters) with real-time visual feedback
- **Strength Meter** - Point-based scoring system with visual indicator bars and strength labels
- **Copy to Clipboard** - One-click copy with visual confirmation
- **Responsive Design** - Optimized layouts for mobile and desktop

## Demo

**Live Site:** [https://karolziober.github.io/password-generator-app/](https://karolziober.github.io/password-generator-app/)

## Tech Stack

- HTML5
- CSS3 (Custom Properties, BEM, Flexbox)
- Vanilla JavaScript (ES6+ Classes)

## Project Structure

```
password-generator-app/
├── assets/images/       # Icons (check, copy, arrow) and favicon
├── index.html           # Main HTML file
├── style.css            # Stylesheet with BEM methodology
├── main.js              # Password generator logic
├── STRENGTH-logic.md    # Strength meter requirements
└── preview.jpg          # Project preview image
```

## Key Implementation Details

### CSS Architecture

- BEM methodology for class naming and component structure
- CSS custom properties for theming and text presets
- Custom-styled range input with dynamic gradient fill
- Custom checkbox styling using `appearance: none`
- Inline SVGs with `currentColor` for interactive icon states
- JetBrains Mono monospace font throughout

### JavaScript

- Object-oriented approach using a self-initializing `Generator` class
- Fisher-Yates shuffle algorithm for unbiased password randomization
- Guaranteed character representation from each selected type
- Data-driven strength scoring with configurable thresholds
- Dynamic CSS custom property updates for slider fill

## Author

- GitHub - [@karolziober](https://github.com/karolziober)
- Frontend Mentor - [@karolziober](https://www.frontendmentor.io/profile/karolziober)

## Acknowledgments

Challenge provided by [Frontend Mentor](https://www.frontendmentor.io).
