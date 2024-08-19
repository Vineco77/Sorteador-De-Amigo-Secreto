import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useParticipantsList } from "../state/hooks/useParticipantsList";
import Draw from "./Draw";

jest.mock("../state/hooks/useParticipantsList", () => {
  return {
    useParticipantsList: jest.fn(),
  };
});

describe("The Draws Page", () => {
  const participants = ["Ana", "Catarina", "Jorel"];
  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue(participants);
  });
  test("Every participant can see their secret friend", () => {
    render(
      <RecoilRoot>
        <Draw />
      </RecoilRoot>
    );

    const options = screen.queryAllByRole("option");
    expect(options).toHaveLength(participants.length);
  });
});
