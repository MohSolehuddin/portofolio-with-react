export default function ProgressStat({
  value,
  text,
}: {
  value: number | string;
  text: string;
}) {
  return (
    <section className="text-center">
      <p className="max-md:text-xl max-xl:text-2xl text-3xl font-extrabold text-navy dark:text-light">
        {value}
      </p>
      <p className="text-light font-semibold max-md:text-xs max-xl:text-sm text-base">
        {text}
      </p>
    </section>
  );
}
