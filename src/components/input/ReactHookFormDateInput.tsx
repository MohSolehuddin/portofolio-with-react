import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface ReactHookFormBooleanInputProps {
  form: UseFormReturn<z.infer<typeof PortfolioInputSchema>>;
  name: keyof z.infer<typeof PortfolioInputSchema>;
  label: string;
}
export default function ReactHookFormDateInput({
  form,
  name,
  label,
}: ReactHookFormBooleanInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="date"
              {...field}
              value={new Date(field.value as Date).toISOString().split("T")[0]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
