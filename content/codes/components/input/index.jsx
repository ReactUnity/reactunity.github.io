function Example({ defaultValue }) {
  return <input
    value={defaultValue}
    style={{ margin: 20 }}
    onChange={val => console.log(val)} />;
};

ReactUnityRenderer.render(
  <Example defaultValue="This is default" />
);
