import { config } from "./config";

describe("QueueTube design token config", () => {
  it("overrides primary-500 to QueueTube accent red", () => {
    expect((config as Record<string, string>)["--color-primary-500"]).toBe("#E94560");
  });

  it("sets primary-400 hover state", () => {
    expect((config as Record<string, string>)["--color-primary-400"]).toBe("#f05a72");
  });

  it("sets primary-600 pressed state", () => {
    expect((config as Record<string, string>)["--color-primary-600"]).toBe("#c73550");
  });

  it("sets dark page background", () => {
    expect((config as Record<string, string>)["--color-background-dark"]).toBe("#181719");
  });

  it("sets card/modal background", () => {
    expect((config as Record<string, string>)["--color-background-0"]).toBe("#121212");
  });

  it("sets elevated surface background", () => {
    expect((config as Record<string, string>)["--color-background-50"]).toBe("#272625");
  });

  it("sets body text typography-900", () => {
    expect((config as Record<string, string>)["--color-typography-900"]).toBe("#f5f5f5");
  });

  it("sets secondary text typography-400", () => {
    expect((config as Record<string, string>)["--color-typography-400"]).toBe("#8c8c8c");
  });

  it("sets placeholder/disabled text typography-600", () => {
    expect((config as Record<string, string>)["--color-typography-600"]).toBe("#d4d4d4");
  });

  it("sets card border outline-300", () => {
    expect((config as Record<string, string>)["--color-outline-300"]).toBe("#737474");
  });

  it("sets subtle border outline-100", () => {
    expect((config as Record<string, string>)["--color-outline-100"]).toBe("#414141");
  });

  it("sets error-400 for destructive actions", () => {
    expect((config as Record<string, string>)["--color-error-400"]).toBe("#e63535");
  });

  it("sets success-500", () => {
    expect((config as Record<string, string>)["--color-success-500"]).toBe("#489766");
  });

  it("sets info-400", () => {
    expect((config as Record<string, string>)["--color-info-400"]).toBe("#0da6f2");
  });

  it("sets warning-500", () => {
    expect((config as Record<string, string>)["--color-warning-500"]).toBe("#fb954b");
  });

  it("sets card radius to 12px", () => {
    expect((config as Record<string, string>)["--radius-xl"]).toBe("12px");
  });

  it("sets button radius to 8px", () => {
    expect((config as Record<string, string>)["--radius-lg"]).toBe("8px");
  });

  it("sets full radius for avatars/FAB", () => {
    expect((config as Record<string, string>)["--radius-full"]).toBe("9999px");
  });
});
