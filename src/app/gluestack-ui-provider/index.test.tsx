import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { GluestackUIProvider } from "./index";

afterEach(() => {
  document.documentElement.classList.remove("dark");
});

describe("GluestackUIProvider", () => {
  it("renders children", () => {
    const { getByTestId } = render(
      <GluestackUIProvider>
        <span data-testid="child">hello</span>
      </GluestackUIProvider>
    );
    expect(getByTestId("child")).toBeDefined();
  });

  it("adds dark class to <html> in dark mode", async () => {
    render(
      <GluestackUIProvider mode="dark">
        <span>content</span>
      </GluestackUIProvider>
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class from <html> in light mode", async () => {
    document.documentElement.classList.add("dark");
    render(
      <GluestackUIProvider mode="light">
        <span>content</span>
      </GluestackUIProvider>
    );
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
