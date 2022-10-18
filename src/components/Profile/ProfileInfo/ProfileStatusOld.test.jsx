import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatusOld";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="hello world" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("hello world");
  });
  test("after creation <span> should be desplayed", () => {
    const component = create(<ProfileStatus status="hello world" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation <input> shouldn't be desplayed", () => {
    const component = create(<ProfileStatus status="hello world" />);
    const root = component.root;
    expect(() => {
      let span = root.findByType("input");
    }).toThrow();
  });
  test("after creation <span> should be contains correct status", () => {
    const component = create(<ProfileStatus status="hello world" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("hello world");
  });
  test("input should be desplayed in editMode instead of span", () => {
    const component = create(<ProfileStatus status="hello world" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("hello world");
  });
  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="hello world" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
