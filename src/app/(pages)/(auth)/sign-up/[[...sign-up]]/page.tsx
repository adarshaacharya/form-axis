"use client";
import { PageWrapper } from "@/components/wrappers/page-wrapper";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <PageWrapper>
      <div className="flex min-w-screen justify-center my-[5rem]">
        <SignUp
          fallbackRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
        />
      </div>
    </PageWrapper>
  );
}
