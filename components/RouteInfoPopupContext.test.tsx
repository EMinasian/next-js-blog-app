import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  RouteInfoPopupProvider,
  useRouteInfoPopup,
} from "./RouteInfoPopupContext";

function Consumer() {
  const { isOpen, hasPopup, open, close, registerPopup, unregisterPopup } =
    useRouteInfoPopup();
  return (
    <div>
      <p>isOpen: {String(isOpen)}</p>
      <p>hasPopup: {String(hasPopup)}</p>
      <button onClick={open}>open</button>
      <button onClick={close}>close</button>
      <button onClick={registerPopup}>register</button>
      <button onClick={unregisterPopup}>unregister</button>
    </div>
  );
}

describe("RouteInfoPopupContext", () => {
  it("throws when used outside of a provider", () => {
    expect(() => render(<Consumer />)).toThrowError(
      "useRouteInfoPopup must be used within a RouteInfoPopupProvider",
    );
  });

  it("starts open with no registered popups", () => {
    render(
      <RouteInfoPopupProvider>
        <Consumer />
      </RouteInfoPopupProvider>,
    );
    expect(screen.getByText("isOpen: true")).toBeInTheDocument();
    expect(screen.getByText("hasPopup: false")).toBeInTheDocument();
  });

  it("toggles isOpen via open/close", async () => {
    render(
      <RouteInfoPopupProvider>
        <Consumer />
      </RouteInfoPopupProvider>,
    );

    await userEvent.click(screen.getByText("close"));
    expect(screen.getByText("isOpen: false")).toBeInTheDocument();

    await userEvent.click(screen.getByText("open"));
    expect(screen.getByText("isOpen: true")).toBeInTheDocument();
  });

  it("tracks hasPopup via register/unregister and reopens on register", async () => {
    render(
      <RouteInfoPopupProvider>
        <Consumer />
      </RouteInfoPopupProvider>,
    );

    await userEvent.click(screen.getByText("register"));
    expect(screen.getByText("hasPopup: true")).toBeInTheDocument();

    await userEvent.click(screen.getByText("close"));
    expect(screen.getByText("isOpen: false")).toBeInTheDocument();

    await userEvent.click(screen.getByText("register"));
    expect(screen.getByText("isOpen: true")).toBeInTheDocument();

    // Two registrations happened above, so it takes two unregisters to
    // bring the popup count back down to zero.
    await userEvent.click(screen.getByText("unregister"));
    await userEvent.click(screen.getByText("unregister"));
    expect(screen.getByText("hasPopup: false")).toBeInTheDocument();
  });

  it("never lets the popup count go below zero", async () => {
    render(
      <RouteInfoPopupProvider>
        <Consumer />
      </RouteInfoPopupProvider>,
    );

    await userEvent.click(screen.getByText("unregister"));
    await userEvent.click(screen.getByText("unregister"));
    expect(screen.getByText("hasPopup: false")).toBeInTheDocument();
  });
});
