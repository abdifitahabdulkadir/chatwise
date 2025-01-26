"use client";

import CredentailAuthForm from "@/components/CredentailAuthForm";

export default function SignUpPage() {
  return (
    <>
      <CredentailAuthForm
        formType="SIGN_UP"
        defaultValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (data) => {
          console.log(data);
        }}
      />
    </>
  );
}
