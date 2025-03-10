"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ChangeEvent } from "react";

interface InputOTPComponentProps {
  handleOtpChange: (e: ChangeEvent<HTMLInputElement>) => void;
  otp: string;
  error: string;
  className?: string;
}

export default function InputOTPComponent({
  handleOtpChange,
  otp,
  error,
  className,
}: InputOTPComponentProps) {
  return (
    <section className={className}>
      <InputOTP maxLength={6} onInput={handleOtpChange} value={otp}>
        <InputOTPGroup className="text-primary">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator className="text-primary" />
        <InputOTPGroup className="text-primary">
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="mt-3 text-red-500 text-sm">*{error}</p>}
    </section>
  );
}
