import renderer from "react-test-renderer";
import {render, screen, fireEvent} from "@testing-library/react";
import {Button} from "./button";

describe("Button component", () => {
  describe("snapshot", () => {
    let tree;
    afterEach(() => {
      expect(tree).toMatchSnapshot();
    });

    it("renders correctly without props", () => {
      tree = renderer.create(<Button />).toJSON();
    });
    it("renders correctly with text", () => {
      tree = renderer.create(<Button text="test" />).toJSON();
    });
    it("renders correctly disabled", () => {
      tree = renderer.create(<Button disabled />).toJSON();
    });
    it("renders correctly isLoader", () => {
      tree = renderer.create(<Button isLoader />).toJSON();
    });
  });
  it("renders correctly event click", () => {
    const mockFn = jest.fn();
    render(<Button text="Ok" onClick={mockFn} />);
    const button = screen.getByText("Ok");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });
});
