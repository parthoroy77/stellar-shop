"use client";
import { useForm } from "@repo/utils/hook-form";
import { Button, Form } from "@ui/index";
import { useState } from "react";
import OnboardingHeader from "./onboarding-header";
import StepperIndicator from "./stepper-indicator";
import StoreInformationForm from "./store-information-form";
const steps = [
  {
    id: 1,
    label: "Store Information",
  },
  {
    id: 2,
    label: "Address Details",
  },
  {
    id: 3,
    label: "Subscription Plans",
  },
];

const OnboardingStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalStep = steps.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalStep;
  const form = useForm();

  const renderElements = (step: number) => {
    switch (step) {
      case 1:
        return <StoreInformationForm form={form} />;
      case 2:
        return <div>Address Details</div>;
      case 3:
        return <div>Subscription Plans</div>;
      default:
        break;
    }
  };
  return (
    <div className="mx-auto w-[55%] space-y-5 py-20">
      <OnboardingHeader />
      <StepperIndicator steps={steps} currentStep={currentStep} />
      <Form {...form}>
        <form>{renderElements(currentStep)}</form>
      </Form>
      <div className="flex items-center justify-between">
        <Button
          variant={"accent"}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          type="button"
          size={"sm"}
          disabled={isFirstStep}
          className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
        >
          Previous
        </Button>
        {isLastStep ? (
          <Button
            variant={"accent"}
            type="button"
            size={"sm"}
            className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant={"accent"}
            onClick={() => setCurrentStep((prev) => prev + 1)}
            type="button"
            size={"sm"}
            disabled={isLastStep}
            className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingStepperForm;
