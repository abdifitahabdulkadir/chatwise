import React from "react";
import { OAuthButtons } from "./OauthButtons";
import { z, ZodType } from "zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldItem, FormLabel, FromErrorElement } from "./FormElements";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
interface CredentialAuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  formType: "SIGN_UP" | "SIGN_IN";
  onSubmit: (data: T) => Promise<ActionResponse>;
}
export default function CredentialAuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: CredentialAuthFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const router = useRouter();
  const handleOnFormSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_UP"
            ? "Signed up successfully"
            : "Signed In successfully",
      });
      router.push("/");
    } else {
      toast({
        title: "Authentication Failed",
        description: result.errors?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <section className="bg-medium-gray flex min-h-screen w-full items-center justify-center">
      <div className="border-darker/50 flex w-full max-w-[600px] flex-col items-center justify-center gap-3 space-y-5 border px-5 py-10 text-white shadow-lg">
        <Image
          src={"/icons/logo.svg"}
          alt="logo icon"
          width={60}
          height={60}
          quality={100}
          loading="eager"
          priority
          className="object-contain"
        />

        <form
          onSubmit={handleSubmit(handleOnFormSubmit)}
          className="border-darker/50 flex h-full w-full flex-col items-center justify-center gap-y-2.5 border-t py-3 pb-5"
        >
          {Object.keys(defaultValues).map((item, index) => {
            const formatItem =
              item.slice(0, 1).toUpperCase() +
              item.slice(1).toLocaleLowerCase();
            return (
              <FormFieldItem key={index}>
                <FormLabel>{formatItem}</FormLabel>
                <Input
                  type={"text"}
                  {...register(item as Path<T>)}
                  className="no-focus rounded-1.5 f focus-visible:!ring-dark-green min-h-12 w-full border !border-white focus-within:border-none focus-visible:!ring-1 focus-visible:!outline-hidden md:w-[400px]"
                />
                {errors[item] && (
                  <FromErrorElement>
                    {errors[item]?.message?.toString()}
                  </FromErrorElement>
                )}
              </FormFieldItem>
            );
          })}
          <Button
            disabled={isSubmitting}
            className="rounded-2 hover:!bg-dark-green mt-5 min-h-12 w-[200px] cursor-pointer px-4 py-3 text-center transition-all duration-300 hover:!text-white"
          >
            {isSubmitting
              ? formType === "SIGN_IN"
                ? "Signining in...."
                : "Signing up...."
              : formType === "SIGN_IN"
                ? "Sign In"
                : "Sign up"}
          </Button>
          <p className="flex w-full items-center justify-center text-white/60">
            {formType === "SIGN_UP"
              ? "Already have an account?"
              : "Don't have an account?"}

            <Link
              className="hover:!text-dark-green ms-3 mt-1 text-sm font-bold transition-colors duration-150"
              href={`${formType == "SIGN_IN" ? "/auth/signup" : "/auth/signin"}`}
            >
              {formType === "SIGN_IN" ? "SIGN UP" : "SIGN IN"}
            </Link>
          </p>
        </form>
        <div className="mt-2 flex w-full flex-col items-center justify-center px-5">
          <div className="flex w-full items-center gap-2">
            <div className="border-darker/50 w-full border" />
            <p>OR</p>
            <div className="border-darker/50 w-full border" />
          </div>
          <OAuthButtons disabled={isSubmitting} />
        </div>
      </div>
    </section>
  );
}
