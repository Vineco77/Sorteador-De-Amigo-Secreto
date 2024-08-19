import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import ParticipantsList from "./ParticipantsList";
import { useParticipantsList } from "../state/hooks/useParticipantsList";

jest.mock("../state/hooks/useParticipantsList", () => {
  return {
    useParticipantsList: jest.fn(),
  };
});

describe("An empty list of participants", () => {
  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue([]);
  });
  test("Must be rendered without any elements", () => {
    render(
      <RecoilRoot>
        <ParticipantsList />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(0);
  });
});

describe("An filled list of participants", () => {
  const participants = ["Ana", "Catarina"];

  beforeEach(() => {
    (useParticipantsList as jest.Mock).mockReturnValue(participants);
  });

  test("Must be rendered without any elements", () => {
    render(
      <RecoilRoot>
        <ParticipantsList />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");
    expect(itens).toHaveLength(participants.length);
  });
});
