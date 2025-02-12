"use client";
import CredentailAuthForm from "@/components/CredentailAuthForm";
import { signInWithCredentials } from "@/lib/actions/crendetial.action";
import { SignInSchema } from "@/lib/validations";

export default function SignInPage() {
  return (
    <>
      <CredentailAuthForm
        schema={SignInSchema}
        formType="SIGN_IN"
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={signInWithCredentials}
      />
    </>
  );
}
