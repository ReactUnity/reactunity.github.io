---
title: <image>
layout: API
---

`<image>` creates an image component. Alternatively, `<rawimage>` creates a raw image component and `<svgimage>` creates a svg image component (requires `Unity.VectorGraphics` package).

<Sandpack>

```js
export default function App() {
  const imageAddress = 'https://picsum.photos/200';
  return <image
    style={{ height: 300, objectFit: 'contain' }}
    source={imageAddress} />;
};
```

</Sandpack>

### Properties

- **source**: Source of the image. Can be a url, a resource path (e.g. 'res:/path/to/file'), the `Texture2D` object or the `Sprite` object.

### Notes

- The css `color` property can be used to tint the image.
