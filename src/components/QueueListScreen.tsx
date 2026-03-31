import { Box, VStack, Text } from "@/components/ui";
import { QueueCard, VideoItem } from "./QueueCard";
import { QueueCardSkeleton } from "./QueueCardSkeleton";

interface QueueListScreenProps {
  items: VideoItem[];
  isLoading?: boolean;
  activeId?: string;
  onItemPress?: (item: VideoItem) => void;
}

const SKELETON_COUNT = 4;

function EmptyState() {
  return (
    <Box className="flex-1 items-center justify-center py-24">
      <VStack space="sm" className="items-center">
        <Text className="text-typography-900 font-bold text-2xl">No Tube yet</Text>
        <Text className="text-typography-400 text-sm text-center max-w-xs">
          Paste YouTube link to queue the video.
        </Text>
      </VStack>
    </Box>
  );
}

export function QueueListScreen({
  items,
  isLoading = false,
  activeId,
  onItemPress,
}: QueueListScreenProps) {
  if (isLoading) {
    return (
      <VStack space="sm" className="w-full max-w-screen-xl mx-auto px-4 py-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <QueueCardSkeleton key={i} />
        ))}
      </VStack>
    );
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <VStack space="sm" className="w-full max-w-screen-xl mx-auto px-4 py-4">
      {items.map((item) => (
        <QueueCard
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onPress={() => onItemPress?.(item)}
        />
      ))}
    </VStack>
  );
}
