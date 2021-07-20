---
title: Audio
css: audio
jsx: audio
order: 0
inherited: false
animatable: false
code: style/audio
---

Plays audio in certain situations. This property is unique to React Unity and does not exist in web CSS.

### Valid values

- The property must have the format `<url> <delay> <iteration-count | infinite>`
  - Example: `url(res:click) 400ms 1` - Meaning to play the resource named `click` after 400ms delay once
  - Example: `url(res:ambiance) infinite` - Meaning to play the resource named `ambiance` on an infinite loop
