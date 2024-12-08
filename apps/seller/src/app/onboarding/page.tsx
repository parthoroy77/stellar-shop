import { Container } from "@ui/index";
import OnboardingStepperForm from "./components/onboarding-stepper-form";

const OnboardingPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Container>
        <OnboardingStepperForm />
      </Container>
    </main>
  );
};

export default OnboardingPage;
