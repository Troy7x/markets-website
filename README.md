# Water Resources Engineering Presentation Website

A stunning, interactive, slide-based presentation website about "Water Resources - Civil Engineering" built with TypeScript and Tailwind CSS.

## Features

- **Luxurious Engineering Theme**: Deep black background with metallic gold accents
- **TypeScript**: Fully typed codebase for better development experience
- **Tailwind CSS**: Modern utility-first CSS framework
- **Interactive Navigation**: Arrow keys, buttons, and touch/swipe support
- **Smooth Animations**: Fade-in and slide transitions
- **Responsive Design**: Perfect on mobile and desktop
- **Bilingual Content**: English and Arabic text

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```
   This will:
   - Compile TypeScript to JavaScript
   - Generate Tailwind CSS from the source file

3. **Development Mode** (optional)
   ```bash
   npm run dev
   ```
   This will watch for changes and rebuild automatically.

4. **Open the Website**
   Simply open `index.html` in your browser.

## Project Structure

```
Websites/
├── index.html          # Main HTML file
├── src/
│   ├── script.ts       # TypeScript source code
│   └── input.css      # Tailwind CSS source
├── dist/
│   ├── script.js      # Compiled JavaScript
│   └── output.css    # Generated CSS
├── Photos/            # Image folder
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
└── tailwind.config.js # Tailwind config
```

## Navigation

- **Arrow Keys**: Navigate between slides (↑↓←→)
- **Navigation Buttons**: Click Previous/Next buttons
- **Touch/Swipe**: Swipe left/right or up/down on mobile devices
- **Keyboard Shortcuts**: 
  - `Home`: Go to first slide
  - `End`: Go to last slide
  - `Page Up/Down`: Navigate slides

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
- `luxury-black`: Deep black background
- `luxury-gold`: Metallic gold accent color
- `text-off-white`: Body text color

### Images
Place your images in the `Photos/` folder and update the paths in `index.html`.

## Technologies Used

- TypeScript
- Tailwind CSS
- Vanilla JavaScript (no frameworks)
- HTML5
- CSS3 Animations

