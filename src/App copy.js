import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({ get }) => {
    const fontSize = get(fontSizeState);
    const unit = "px";

    return `${fontSize}${unit}`;
  },
});

const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

const FontButton = () => {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <div>
      <button onClick={() => setFontSize((size) => size - 1)}>-</button>
      <button onClick={() => setFontSize((size) => size + 1)}>+</button>
    </div>
  );
};

const Text = () => {
  const fontSize = useRecoilValue(fontSizeState);
  return <p style={{ fontSize }}>This text will increase in size too.</p>;
};

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);
  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
};

const CharacterCounter = () => {
  const count = useRecoilValue(charCountState);
  return (
    <div>
      <TextInput />
      <p>Character Count: {count}</p>
    </div>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <div>
        {/* <FontButton />
        <Text /> */}
        <CharacterCounter />
      </div>
    </RecoilRoot>
  );
};

export default App;
