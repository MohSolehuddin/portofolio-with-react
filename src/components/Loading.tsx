import clsx from "clsx";

export default function Loading({ className }: { className?: string }) {
  return (
    <section className={clsx("flex justify-center items-center", className)}>
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.5s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.1s]"></div>
      </div>
    </section>
  );
}
