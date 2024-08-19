import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

// Jest

describe("The Form.tsx's behaviour", () => {
  test("When the input is empty, new participants can not be added", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    // Find DOM's input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // Find button
    const button = screen.getByRole("button");

    // Make sure the input is documented
    expect(input).toBeInTheDocument();

    // Make sure the button is disabled
    expect(button).toBeDisabled();
  });

  test("Add a participant if a name on exists in the input", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );

    // Find DOM's input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // Find button
    const button = screen.getByRole("button");

    // Insert a value in the input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    // Click on the button to submit
    fireEvent.click(button);

    // Ensure that the input field is focused
    expect(input).toHaveFocus();

    // Ensure that the input is cleared
    expect(input).toHaveValue("");
  });

  test("Duplicated names cannot be added to the list", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const button = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(button);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(button);

    const erroMessage = screen.getByRole("alert");

    expect(erroMessage.textContent).toBe("Duplicated names aren't allowed");
  });

  test("The error message must be cleared after the timers have finished", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const button = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(button);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(button);

    let erroMessage = screen.queryByRole("alert");
    expect(erroMessage).toBeInTheDocument();

    // Wait X seconds
    act(() => {
      jest.runAllTimers();
    });

    erroMessage = screen.queryByRole("alert");
    expect(erroMessage).toBeNull();
  });
});
