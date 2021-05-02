function Example() {
  return <view style={{ backgroundColor: 'white' }}>
    <render height={200} width={200}
      camera={Globals.Camera} />
  </view>;
};

ReactUnityRenderer.render(<Example />);
