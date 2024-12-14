"use client";
import { sellerOnboarding } from "@/actions/seller.action";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { sellerOnboardingValidationSchema, TSellerOnboardingValidation } from "@repo/utils/validations";
import { Button, Form } from "@ui/index";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import AddressDetailsFields from "./address-details-fields";
import OnboardingHeader from "./onboarding-header";
import OnboardingSubmitted from "./onboarding-submitted";
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
type SellerStatus = {
  approved: boolean;
  submitted: boolean;
};

const defaultFormValues: TSellerOnboardingValidation = {
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
};

const OnboardingStepperForm = ({ sellerStatus }: { sellerStatus: SellerStatus }) => {
  const [currentStep, setCurrentStep] = useState(sellerStatus?.submitted || sellerStatus.approved ? 3 : 1);
  const [isPending, startTransition] = useTransition();
  const [isReviewing, setIsReviewing] = useState(sellerStatus?.submitted || false);

  const form = useForm<TSellerOnboardingValidation>({
    resolver: zodResolver(sellerOnboardingValidationSchema),
    defaultValues: defaultFormValues,
  });

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length - 1;
  const isFinalStep = currentStep === steps.length;

  const renderElements = useCallback(
    (step: number) => {
      switch (step) {
        case 1:
          return <StoreInformationFields form={form} />;
        case 2:
          return <AddressDetailsFields form={form} />;
        case 3:
          return <OnboardingSuccessful />;
        default:
          return null;
      }
    },
    [form]
  );

  const onSubmitHandler = (data: TSellerOnboardingValidation) => {
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
      const result = await sellerOnboarding(formData);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        setIsReviewing(true);
        setCurrentStep(steps.length);
        form.reset();
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  useEffect(() => {
    if (sellerStatus.approved) {
      setCurrentStep(steps.length);
      setIsReviewing(false);
    }
  }, [sellerStatus.approved]);

  const navigationButtons = useMemo(
    () => (
      <div className="flex items-center justify-between">
        <Button
          variant="accent"
          onClick={handlePrevious}
          type="button"
          size="sm"
          disabled={isFirstStep || isPending}
          className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
        >
          Previous
        </Button>
        {isLastStep ? (
          <Button
            variant="accent"
            type="button"
            onClick={form.handleSubmit(onSubmitHandler)}
            size="sm"
            disabled={isPending}
            className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
          >
            {isPending ? "Submitting..." : "Proceed"}
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={handleNext}
            type="button"
            size="sm"
            disabled={isPending}
            className="hover:text-secondary min-w-[100px] hover:border hover:bg-white"
          >
            Next
          </Button>
        )}
      </div>
    ),
    [isFirstStep, isLastStep, isPending, handlePrevious, handleNext, form, onSubmitHandler]
  );

  return (
    <div className="mx-auto w-[55%] space-y-5 py-20">
      <OnboardingHeader />
      <StepperIndicator steps={steps} currentStep={currentStep} loading={isPending} />
      {isReviewing ? (
        <OnboardingSubmitted />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>{renderElements(currentStep)}</form>
          </Form>
          {!isFinalStep && navigationButtons}
        </>
      )}
    </div>
  );
};

export default OnboardingStepperForm;
