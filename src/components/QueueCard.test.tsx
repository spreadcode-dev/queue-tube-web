import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { QueueCard } from "./QueueCard";

// Minimal mocks for gluestack-ui primitives so tests run in jsdom without RN
vi.mock("@/components/ui", () => ({
  Box: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  Pressable: ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: () => void;
  }) => <button onClick={onPress}>{children}</button>,
  Text: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className}>{children}</span>
  ),
  HStack: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  VStack: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

describe("QueueCard", () => {
  it("renders the queue name", () => {
    render(<QueueCard name="My Queue" videoCount={5} />);
    expect(screen.getByText("My Queue")).toBeTruthy();
  });

  it("renders the video count", () => {
    render(<QueueCard name="My Queue" videoCount={5} />);
    expect(screen.getByText("5 videos")).toBeTruthy();
  });

  it("calls onPress when the card is pressed", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<QueueCard name="My Queue" videoCount={3} onPress={onPress} />);
    await user.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it("applies active border class when isActive is true", () => {
    const { container } = render(<QueueCard name="Active Queue" videoCount={2} isActive />);
    expect(container.innerHTML).toContain("border-l-primary-500");
  });

  it("does not apply active border class when isActive is false", () => {
    const { container } = render(<QueueCard name="Inactive Queue" videoCount={1} isActive={false} />);
    expect(container.innerHTML).not.toContain("border-l-primary-500");
  });

  it("renders with default isActive=false when prop is omitted", () => {
    const { container } = render(<QueueCard name="Default Queue" videoCount={0} />);
    expect(container.innerHTML).not.toContain("border-l-primary-500");
  });
});
