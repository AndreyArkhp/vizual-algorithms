import renderer from "react-test-renderer";
import {Circle} from "./circle";

describe("Circle component", () => {
  let tree;
  afterEach(() => {
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly without props", () => {
    tree = renderer.create(<Circle />);
  });
  it("renders correctly with letter", () => {
    tree = renderer.create(<Circle letter="test" />);
  });
  it("render correctly with head", () => {
    tree = renderer.create(<Circle head={"head"} />);
  });
  it("render correctly with react element in the head", () => {
    tree = renderer.create(<Circle head={<Circle isSmall />} />);
  });
  it("render correctly with tail", () => {
    tree = renderer.create(<Circle tail={"tail"} />);
  });
  it("render correctly with react element in the tail", () => {
    tree = renderer.create(<Circle tail={<Circle isSmall />} />);
  });
  it("render correctly with index", () => {
    tree = renderer.create(<Circle index={1} />);
  });
  it("render correctly with prop isSmall", () => {
    tree = renderer.create(<Circle isSmall />);
  });
  it("render correctly in the default state", () => {
    tree = renderer.create(<Circle state="default" />);
  });
  it("render correctly in the changing state", () => {
    tree = renderer.create(<Circle state="changing" />);
  });
  it("render correctly in the modified state", () => {
    tree = renderer.create(<Circle state="modified" />);
  });
});
