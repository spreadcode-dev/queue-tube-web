import { Box, Pressable, Text, HStack, VStack } from "@/components/ui";

interface QueueCardProps {
  name: string;
  videoCount: number;
  isActive?: boolean;
  onPress?: () => void;
}

export function QueueCard({ name, videoCount, isActive = false, onPress }: QueueCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Box
        className={[
          "rounded-xl px-4 py-3",
          "bg-background-0 border border-outline-300",
          isActive ? "border-l-4 border-l-primary-500" : "",
        ].join(" ")}
      >
        <HStack space="sm" className="items-center">
          <VStack className="flex-1">
            <Text className="text-typography-900 font-bold text-md">{name}</Text>
            <Text className="text-typography-400 text-sm">{videoCount} videos</Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}
