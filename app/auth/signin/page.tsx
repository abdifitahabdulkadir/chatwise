"use client";
import CredentailAuthForm from "@/components/CredentailAuthForm";

export default function SignInPage() {
  return (
    <>
      <CredentailAuthForm
        formType="SIGN_IN"
        defaultValues={{
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
