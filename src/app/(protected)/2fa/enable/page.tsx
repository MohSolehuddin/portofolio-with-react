"use client";
import AlertSuccess from "@/components/alerts/AlertSuccess";
import InputOTPComponent from "@/components/input/InputOTPComponent";
import { generate2fa } from "@/server/actions/2fa/generate";
import { verify2fa } from "@/server/actions/2fa/verify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import QRCode from "react-qr-code";

const TwoFactorModal = () => {
  const [qrData, setQrData] = useState("");
  const [secret, setSecret] = useState("");

  const [resultFromGenerating2fa, setResultFromGenerating2fa] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });
  const [otp, setOtp] = useState("");

  const { update } = useSession();
  const router = useRouter();

  const handleOtpChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (resultFromGenerating2fa.message)
      setResultFromGenerating2fa({ success: null, message: "" });
    setOtp(e.target.value);

    if (e.target.value.length === 6) {
      const token = e.target.value;
      let response;
      if (!secret) {
        update({ otp: token });
      } else {
        response = await verify2fa({ token, secret });
      }

      if (response) {
        setResultFromGenerating2fa(response);
        if (!response.success) return;
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    }
  };

  const get2faQrCode = async () => {
    const response = await generate2fa();
    if (response) {
      setQrData(response.otpauthUrl);
      setSecret(response.secret);
    }
  };

  useEffect(() => {
    get2faQrCode();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen absolute top-0 left-0">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-1 justify-center items-center p-4 text-white rounded-md">
            {qrData && (
              <QRCode
                value={qrData}
                size={256}
                fgColor="#074799"
                bgColor="#fff"
                className="rounded-lg border-2"
              />
            )}
          </div>

          <div className="flex-1 p-4  rounded-md">
            <p className="text-2xl text-primary font-bold mb-4">
              Use an Authenticator App to enable 2FA
            </p>
            <ul className="list-none list-inside mb-4 text-gray-700 dark:text-white">
              <li className="mb-2">
                <span className="font-bold text-primary">Step 1:</span> Scan the
                QR Code with your Authenticator app.
              </li>
              <li className="mb-2">
                <span className="font-bold text-primary">Step 2:</span> Enter
                the code below from your app.
              </li>
            </ul>

            <InputOTPComponent
              handleOtpChange={handleOtpChange}
              otp={otp}
              error={
                resultFromGenerating2fa.success == false
                  ? resultFromGenerating2fa.message
                  : ""
              }
            />
            <AlertSuccess
              message={
                resultFromGenerating2fa.success
                  ? resultFromGenerating2fa.message
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
