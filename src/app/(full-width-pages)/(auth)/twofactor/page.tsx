import TwoFactorForm  from '@/components/auth/TwoFactorForm'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js TwoFactor Page TailAdmin Dashboard Template",
  // other metadata
};

export default function TwoFactor () {
  return <TwoFactorForm/>
}

