import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface ReactHookFormBooleanInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  selectItemLabels?: {
    true: string;
    false: string;
  };
  label: string;
}

export default function ReactHookFormBooleanInput<T extends FieldValues>({
  form,
  name,
  selectItemLabels,
  label,
}: ReactHookFormBooleanInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => {
                form.setValue(
                  name,
                  (value === "true") as PathValue<T, Path<T>>
                );
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">
                  {selectItemLabels?.true || "Yes"}
                </SelectItem>
                <SelectItem value="false">
                  {selectItemLabels?.false || "No"}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
