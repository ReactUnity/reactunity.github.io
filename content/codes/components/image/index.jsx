const imageAddress = "https://avatars.githubusercontent.com/u/62178684";

function Example() {
  return <image
    style={{ height: 200, objectFit: 'scale-down' }}
    source={imageAddress} />;
};

ReactUnityRenderer.render(<Example />);
