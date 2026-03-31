import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueueListScreen } from "./QueueListScreen";
import { VideoItem } from "./QueueCard";

const sampleItems: VideoItem[] = [
  {
    id: "v1",
    title: "First Video",
    creatorName: "Creator One",
    viewCount: 500,
    thumbnailUrl: "https://example.com/v1.jpg",
  },
  {
    id: "v2",
    title: "Second Video",
    creatorName: "Creator Two",
    viewCount: 2_000,
    thumbnailUrl: "https://example.com/v2.jpg",
  },
];

describe("QueueListScreen", () => {
  describe("empty state", () => {
    it('shows "No Tube yet" heading when items array is empty', () => {
      render(<QueueListScreen items={[]} />);
      expect(screen.getByText("No Tube yet")).toBeTruthy();
    });

    it("shows the subtext when items array is empty", () => {
      render(<QueueListScreen items={[]} />);
      expect(
        screen.getByText("Paste YouTube link to queue the video.")
      ).toBeTruthy();
    });

    it("does not render QueueCards when empty", () => {
      render(<QueueListScreen items={[]} />);
      expect(screen.queryByAltText(/./)).toBeNull();
    });
  });

  describe("loading state", () => {
    it("renders skeleton cards while loading", () => {
      const { container } = render(<QueueListScreen items={[]} isLoading />);
      const pulseBoxes = container.querySelectorAll(".animate-pulse");
      expect(pulseBoxes.length).toBeGreaterThan(0);
    });

    it("does not render empty state while loading", () => {
      render(<QueueListScreen items={[]} isLoading />);
      expect(screen.queryByText("No Tube yet")).toBeNull();
    });
  });

  describe("populated state", () => {
    it("renders all provided video items", () => {
      render(<QueueListScreen items={sampleItems} />);
      expect(screen.getByText("First Video")).toBeTruthy();
      expect(screen.getByText("Second Video")).toBeTruthy();
    });

    it("does not show empty state when items are present", () => {
      render(<QueueListScreen items={sampleItems} />);
      expect(screen.queryByText("No Tube yet")).toBeNull();
    });

    it("calls onItemPress with the correct item when a card is pressed", async () => {
      const user = userEvent.setup();
      const handlePress = vi.fn();
      render(<QueueListScreen items={sampleItems} onItemPress={handlePress} />);
      await user.click(screen.getByText("First Video"));
      expect(handlePress).toHaveBeenCalledWith(sampleItems[0]);
    });

    it("marks the active card via activeId", () => {
      const { container } = render(
        <QueueListScreen items={sampleItems} activeId="v1" />
      );
      const activeAccent = container.querySelector(".border-l-primary-500");
      expect(activeAccent).not.toBeNull();
    });
  });
});
