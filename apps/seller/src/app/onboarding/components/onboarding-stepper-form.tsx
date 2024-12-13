"use client";
import { useForm } from "@repo/utils/hook-form";
import { Button, Form } from "@ui/index";
import { useEffect, useState } from "react";
import AddressDetailsFields from "./address-details-fields";
import FinalReview from "./final-review";
import OnboardingHeader from "./onboarding-header";
import StepperIndicator from "./stepper-indicator";
import StoreInformationFields from "./store-information-fields";

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
    label: "Final Review",
  },
];

const OnboardingStepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewing] = useState(false);
  const totalStep = steps.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalStep - 1;
  const form = useForm();

  const renderElements = (step: number) => {
    switch (step) {
      case 1:
        return <StoreInformationFields form={form} />;
      case 2:
        return <AddressDetailsFields form={form} />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isReviewing) {
      setCurrentStep(steps.length);
    }
  }, [isReviewing]);

  return (
    <div className="mx-auto w-[55%] space-y-5 py-20">
      <OnboardingHeader />
      <StepperIndicator steps={steps} currentStep={currentStep} />
      {isReviewing ? (
        <FinalReview />
      ) : (
        <>
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
                Proceed
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
        </>
      )}
    </div>
  );
};

export default OnboardingStepperForm;
