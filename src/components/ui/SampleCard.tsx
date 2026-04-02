export function SampleCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl bg-background-0 p-4">
      <h2 className="text-xl text-typography-900">{title}</h2>
    </div>
  );
}
