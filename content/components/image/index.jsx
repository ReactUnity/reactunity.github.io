const imageAddress = "https://avatars.githubusercontent.com/u/62178684";

function Example() {
  return <image
    style={{ height: 200 }}
    fit={2}
    source={imageAddress} />;
};

ReactUnityRenderer.render(<Example />);
