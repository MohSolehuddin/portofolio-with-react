import { Input } from "../ui/input";

interface FileInputProps {
  onChange: (file: File | null) => void;
  accept: string;
}
export const FileInput: React.FC<FileInputProps> = ({ onChange, accept }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file || null);
  };

  return <Input type="file" accept={accept} onChange={handleFileChange} />;
};
