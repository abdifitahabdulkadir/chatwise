"use client";

import CredentailAuthForm from "@/components/Forms/CredentailAuthForm";
import { signUpWithCrendentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

export default function SignUpPage() {
  return (
    <>
      <CredentailAuthForm
        formType="SIGN_UP"
        schema={SignUpSchema}
        defaultValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={signUpWithCrendentials}
      />
    </>
  );
}
