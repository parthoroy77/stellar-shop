import { Container } from "@ui/index";
import StepperIndicator from "./components/stepper-indicator";

const OnboardingPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Container>
        <div className="mx-auto w-[55%] space-y-5 py-20">
          <div className="space-y-3">
            <h1 className="text-3xl font-medium">Let's set up your store!</h1>
            <h4 className="text-accent-foreground">Complete the following steps to set up your seller account</h4>
          </div>
          <StepperIndicator />
        </div>
      </Container>
    </main>
  );
};

export default OnboardingPage;
