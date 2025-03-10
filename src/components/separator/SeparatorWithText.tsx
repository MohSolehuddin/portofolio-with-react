export default function SeparatorWithText({ label }: { label: string }) {
  return (
    <section className="flex gap-4 w-full justify-center items-center my-4">
      <div className="h-[1px] w-full bg-gray-400"></div>
      <p>{label}</p>
      <div className="h-[1px] w-full bg-gray-400"></div>
    </section>
  );
}
