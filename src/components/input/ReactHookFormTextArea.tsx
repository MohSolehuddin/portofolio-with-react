import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ReactHookFormTextInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
}

export default function ReactHookFormTextArea<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className,
}: ReactHookFormTextInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder ?? label}
              value={
                typeof field.value === "string"
                  ? field.value
                  : field.value != null
                  ? String(field.value)
                  : ""
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
              className={className ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
