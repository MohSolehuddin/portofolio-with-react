export default function ProgressStat({
  value,
  text,
}: {
  value: number | string;
  text: string;
}) {
  return (
    <section className="text-center">
      <p className="text-3xl font-extrabold text-navy dark:text-light">
        {value}
      </p>
      <p className="text-light">{text}</p>
    </section>
  );
}
