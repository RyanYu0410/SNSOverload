# One More Scroll Then Sleep 📱🌙

An interactive web art piece about the endless scroll of social media and the lies we tell ourselves: *"just one more, then I'll sleep"*

## Concept

This webpage simulates a fake social media feed where all content is placeholder. The real experience is the user repeatedly clicking "One More Scroll Then Sleep" while being gently interrupted by the page itself - as if the interface is trying to help you stop, but not too hard.

## Features

### Progressive Button Text
The main button changes its text based on how many times you've clicked, becoming increasingly self-aware:
- "One More Scroll Then Sleep"
- "One More Scroll Then REALLY Sleep"
- "Okay, LAST One 🤥"
- "I Swear I'll Close After This"
- ...and more

### Visual Progression
- Page gradually darkens as count increases (simulating "getting later")
- Sleep indicator (Z, Zz, Zzz) appears in corner after 15+ scrolls
- Image blur effect at high counts

### Gentle Interruptions
Various dialog boxes appear at specific counts:
- **Excuse Helper** (count 8, 16): Gives you an excuse to keep scrolling
- **Remember Prompt** (count 12, 20): Offers to remember where you stopped
- **Body Messages** (count 15, 25): Messages from your "eyes" and "brain"
- **Cat Reminder** (count 18, 28): A cute cat slides in asking you to sleep
- **5-Second Rest** (every 10 posts): A forced breathing pause

### Sleep Screen
When you finally choose to "go to sleep", the page transitions to a peaceful good night screen.

## How to Run

1. Simply open `index.html` in a web browser
2. No server required - it's all vanilla HTML/CSS/JS
3. Add your own images to the `images/` folder (see `images/README.md`)

## Customization

### Change the fake posts
Edit the `fakePosts` array in `script.js`:

```javascript
const fakePosts = [
  { image: 'images/feed1.png', caption: "your caption here ✨" },
  // ... add more
];
```

### Adjust interruption timing
Modify the count checks in the `checkInterruptions()` function in `script.js`.

### Modify button/tip text
Edit `getButtonText()` and `getTipText()` functions to change the messages.

### Customize colors
Edit CSS variables in `:root` at the top of `style.css`:

```css
:root {
  --neon-pink: #ff6eb4;
  --neon-purple: #bf7fff;
  --neon-cyan: #00e5ff;
  /* ... etc */
}
```

## Visual Style

Inspired by *NEEDY GIRL OVERDOSE*'s "overload livestream" interface:
- High saturation neon colors (pink, purple, cyan)
- Dark night sky background
- Glow effects and soft shadows
- Floating decorative elements (hearts, stars, chat bubbles)
- Cute but readable sans-serif fonts

## Tech Stack

- Pure vanilla HTML5
- Pure vanilla CSS3 (with CSS variables and animations)
- Pure vanilla JavaScript (ES6+)
- No frameworks, no build tools, no dependencies

## Credits

Created as an interactive art piece exploring digital habits and the gentle lies of "one more scroll."

---

*"The button was never meant to stop you. It just wanted to acknowledge with you: 'one more scroll then sleep' was never really true."*


