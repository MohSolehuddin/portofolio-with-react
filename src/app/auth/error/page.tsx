import AuthContainer from "@/components/auth/AuthContainer";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
  return (
    <AuthContainer variant="error">
      <FaExclamationTriangle className="text-9xl bg-red-600 p-6 rounded-full text-white mb-6" />
    </AuthContainer>
  );
}
