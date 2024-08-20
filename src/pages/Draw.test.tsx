import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useParticipantsList } from "../state/hooks/useParticipantsList";
import Draw from "./Draw";
import { useDrawResult } from "../state/hooks/useDrawResult";
import { act } from "react-dom/test-utils";

jest.mock("../state/hooks/useParticipantsList", () => {
  return {
    useParticipantsList: jest.fn(),
  };
});

jest.mock("../state/hooks/useDrawResult", () => {
  return {
    useDrawResult: jest.fn(),
  };
});

describe("The Draws Page", () => {
  const participants = ["Ana", "Catarina", "Jorel"];

  const result = new Map([
    ["Ana", "Jorel"],
    ["Catarina", "Ana"],
    ["Jorel", "Catarina"],
  ]);

  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue(participants);
    (useDrawResult as jest.Mock).mockReturnValue(result);
  });
  test("Every participant can see their secret friend", () => {
    render(
      <RecoilRoot>
        <Draw />
      </RecoilRoot>
    );

    const options = screen.queryAllByRole("option");
    expect(options).toHaveLength(participants.length + 1); //Because there was a option default
  });

  test("The secret friend is displayed when requested", () => {
    render(
      <RecoilRoot>
        <Draw />
      </RecoilRoot>
    );
    // Find select
    const select = screen.getByPlaceholderText("Selecione o seu nome");

    fireEvent.change(select, {
      target: {
        value: participants[0],
      },
    });

    //Find the button

    const button = screen.getByRole("button");

    fireEvent.click(button);

    const secretFriend = screen.getByRole("alert");

    expect(secretFriend).toBeInTheDocument();
  });
  test("Hide the friend's secret name after 5 seconds", () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Draw />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText("Selecione o seu nome");
    fireEvent.change(select, {
      target: {
        value: participants[0],
      },
    });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    let secretFriend = screen.queryByRole("alert");

    expect(secretFriend).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    expect(secretFriend).not.toBeInTheDocument();
  });
});
