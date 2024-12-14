import { getServerAuth } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { Container } from "@ui/index";
import { Session } from "next-auth";
import { Suspense } from "react";
import OnboardingFormSkeleton from "./components/onboarding-form-skeleton";
import OnboardingStepperForm from "./components/onboarding-stepper-form";
const revalidateAt = 300;
const onboardingStatusCheck = async (session: Session) => {
  const result = await fetcher<{ approved: boolean; submitted: boolean }>(
    `/sellers/onboarding/status/${session.user.id!}`,
    { session, next: { revalidate: revalidateAt, tags: ["onboarding-status"] } }
  );
  return result.data;
};

const OnboardingPage = async () => {
  const { session } = await getServerAuth();
  const onboardingStatus = await onboardingStatusCheck(session!);
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Container>
        <Suspense fallback={<OnboardingFormSkeleton />}>
          <OnboardingStepperForm sellerStatus={onboardingStatus!} />
        </Suspense>
      </Container>
    </main>
  );
};

export default OnboardingPage;
