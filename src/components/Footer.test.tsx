import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useParticipantsList } from "../state/hooks/useParticipantsList";
import Footer from "./Footer";

jest.mock("../state/hooks/useParticipantsList", () => {
  return {
    useParticipantsList: jest.fn(),
  };
});

const mockNavigate = jest.fn();
const mockDraw = jest.fn();

jest.mock("../state/hooks/useDrawer", () => {
  return {
    useDrawer: () => mockDraw,
  };
});

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe("There aren't enough participants", () => {
  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue([]);
  });

  test("The game cannot start", () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});

describe("There are enough participants", () => {
  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue([
      "Ana",
      "Catarina",
      "Josefina",
    ]);
  });
  test("the game can start", () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
  test("The game has begun", () => {
    render(
      <RecoilRoot>
        <Footer />
      </RecoilRoot>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/draw");
    expect(mockDraw).toHaveBeenCalledTimes(1);
  });
});
