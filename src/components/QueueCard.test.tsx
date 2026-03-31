import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueueCard, VideoItem } from "./QueueCard";

const mockItem: VideoItem = {
  id: "vid-1",
  title: "Amazing React Tutorial",
  creatorName: "Code Academy",
  viewCount: 1_250_000,
  thumbnailUrl: "https://example.com/thumb.jpg",
};

describe("QueueCard", () => {
  it("renders video title, creator name, and view count", () => {
    render(<QueueCard item={mockItem} />);
    expect(screen.getByText("Amazing React Tutorial")).toBeTruthy();
    expect(screen.getByText("Code Academy")).toBeTruthy();
    expect(screen.getByText("1.2M views")).toBeTruthy();
  });

  it("renders thumbnail image with correct alt text", () => {
    render(<QueueCard item={mockItem} />);
    const img = screen.getByAltText("Amazing React Tutorial");
    expect(img).toBeTruthy();
  });

  it("applies active left accent class when isActive is true", () => {
    const { container } = render(<QueueCard item={mockItem} isActive />);
    const box = container.querySelector(".border-l-primary-500");
    expect(box).not.toBeNull();
  });

  it("does not apply active left accent class when isActive is false", () => {
    const { container } = render(<QueueCard item={mockItem} isActive={false} />);
    const box = container.querySelector(".border-l-primary-500");
    expect(box).toBeNull();
  });

  it("calls onPress when the card is pressed", async () => {
    const user = userEvent.setup();
    const handlePress = vi.fn();
    render(<QueueCard item={mockItem} onPress={handlePress} />);
    await user.click(screen.getByText("Amazing React Tutorial"));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("renders the overflow menu icon", () => {
    render(<QueueCard item={mockItem} />);
    expect(screen.getByLabelText("More options")).toBeTruthy();
  });

  it("formats view counts below 1K correctly", () => {
    render(<QueueCard item={{ ...mockItem, viewCount: 999 }} />);
    expect(screen.getByText("999 views")).toBeTruthy();
  });

  it("formats view counts in the thousands correctly", () => {
    render(<QueueCard item={{ ...mockItem, viewCount: 45_300 }} />);
    expect(screen.getByText("45.3K views")).toBeTruthy();
  });
});
