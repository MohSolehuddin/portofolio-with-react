import clsx from "clsx";

interface TextErrorProps {
  className?: string;
  text: string;
}
export default function TextError({ className, text }: TextErrorProps) {
  return (
    <section className={clsx("flex justify-center items-center", className)}>
      <p className="text-center text-red-500">{text}</p>
    </section>
  );
}
