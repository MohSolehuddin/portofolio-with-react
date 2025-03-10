import AuthContainer from "@/components/auth/AuthContainer";
import { FormRegister } from "@/components/auth/FormRegister";

export default function Home() {
  return (
    <AuthContainer variant="register">
      <FormRegister />
    </AuthContainer>
  );
}
