function Example({ name }) {
  return <text style={{ color: 'yellow' }}>
    Hello {name}
  </text>;
};

ReactUnityRenderer.render(
  <Example name={'John Doe'} />
);
