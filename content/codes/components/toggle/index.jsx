function Example() {
  const light = Globals.Light;

  return <view style={{
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
  }}>
    <toggle
      onChange={val => light.enabled = val}
      value={light.enabled} />

    Toggle light
  </view>;
};

ReactUnityRenderer.render(<Example />);