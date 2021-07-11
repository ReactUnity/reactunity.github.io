function Example() {
  const light = Globals.Light;

  return <button
    style={{ margin: 20 }}
    onClick={() => light.enabled = !light.enabled}>
    Toggle Light
  </button>;
};

ReactUnityRenderer.render(<Example />);
