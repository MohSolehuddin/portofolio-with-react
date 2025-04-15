import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FileInput } from "./FileInput";

interface ReactHookFormTextInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  onFileChange?: (file: File) => void;
}

export default function ReactHookFormFileInput<T extends FieldValues>({
  form,
  name,
  label,
  onFileChange,
}: ReactHookFormTextInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileInput
              onChange={(file) => {
                if (file) {
                  form.setValue(name, file as PathValue<T, Path<T>>);
                }
                if (file && onFileChange) {
                  onFileChange(file);
                }
              }}
              accept="image/*"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
