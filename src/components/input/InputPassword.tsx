"use client";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function InputPassword({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder="********"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-0 top-0 cursor-pointer bg-transparent hover:bg-transparent">
        {showPassword ? (
          <EyeClosed className="text-primary" />
        ) : (
          <Eye className="text-primary" />
        )}
      </Button>
    </div>
  );
}
