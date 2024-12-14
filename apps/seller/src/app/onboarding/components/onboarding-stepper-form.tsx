"use client";
import { useClientSession } from "@/lib/auth-utils";
import { fetcher } from "@/lib/fetcher";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { sellerOnboardingValidationSchema, TSellerOnboardingValidation } from "@repo/utils/validations";
import { Button, Form } from "@ui/index";
import { revalidateTag } from "next/cache";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import AddressDetailsFields from "./address-details-fields";
import FinalReview from "./final-review";
import OnboardingHeader from "./onboarding-header";
import OnboardingSuccessful from "./onboarding-successful";
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

const OnboardingStepperForm = ({ sellerApproved }: { sellerApproved: { approved: boolean; submitted: boolean } }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { session } = useClientSession();
  const [isPending, startTransition] = useTransition();
  const [isReviewing, setIsReviewing] = useState(sellerApproved?.submitted || false);
  const totalStep = steps.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalStep - 1;
  const isFinalStep = currentStep === steps.length;
  const form = useForm<TSellerOnboardingValidation>({
    resolver: zodResolver(sellerOnboardingValidationSchema),
    defaultValues: {
      banner: null,
      logo: null,
      shopName: "",
      shopDescription: "",
      businessEmail: "",
      contactNumber: "",
      fullAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      isPrimary: true,
      type: "BUSINESS",
    },
  });

  const renderElements = (step: number) => {
    switch (step) {
      case 1:
        return <StoreInformationFields form={form} />;
      case 2:
        return <AddressDetailsFields form={form} />;
      case 3:
        return <OnboardingSuccessful />;
      default:
        break;
    }
  };

  const onOnboardingSubmit = (data: TSellerOnboardingValidation) => {
    const toastId = toast.loading("Sending you request!", { duration: 3000 });
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (status) {
      toast.info("Your request already submitted!", { id: toastId });
      return;
    }
    startTransition(async () => {
      const result = await fetcher("/sellers/onboarding", {
        method: "POST",
        body: formData,
        session,
      });
      if (result.success) {
        toast.success(result.message, { id: toastId });
        revalidateTag("onboarding-status");
        form.reset();
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };  
  console.log(sellerApproved);

  useEffect(() => {
    if (sellerApproved.approved) {
      setCurrentStep(steps.length);
      setIsReviewing(false);
    }
  }, [sellerApproved]);

  return (
    <div className="mx-auto w-[55%] space-y-5 py-20">
      <OnboardingHeader />
      <StepperIndicator steps={steps} currentStep={currentStep} />
      {isReviewing ? (
        <FinalReview />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onOnboardingSubmit)}>{renderElements(currentStep)}</form>
          </Form>
          {!isFinalStep && (
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
                  onClick={form.handleSubmit(onOnboardingSubmit)}
                  size={"sm"}
                  disabled={isPending}
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
          )}
        </>
      )}
    </div>
  );
};

export default OnboardingStepperForm;
