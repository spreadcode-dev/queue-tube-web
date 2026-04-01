export function SampleCard({ title }: { title: string }) {
  return (
    <div className="bg-background-0 rounded-xl p-4">
      <h2 className="text-xl text-typography-900">{title}</h2>
    </div>
  );
}
