import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appellon",
  description:
    "Appellon",
};


export default function SignUp() {
  return <SignUpForm />;
}
