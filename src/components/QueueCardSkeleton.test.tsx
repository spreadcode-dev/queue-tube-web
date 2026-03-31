import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { QueueCardSkeleton } from "./QueueCardSkeleton";

describe("QueueCardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<QueueCardSkeleton />);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders skeleton pulse boxes", () => {
    const { container } = render(<QueueCardSkeleton />);
    const pulseBoxes = container.querySelectorAll(".animate-pulse");
    // thumbnail + 3 text lines
    expect(pulseBoxes.length).toBeGreaterThanOrEqual(4);
  });
});
