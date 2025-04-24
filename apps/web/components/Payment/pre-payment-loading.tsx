"use client";

import { Card, CardContent } from "@ui/index";
import { ExternalLink, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface PrePaymentLoadingProps {
  orderId: string;
}

const PrePaymentLoading = ({ orderId = "ORD-12345" }: PrePaymentLoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Verifying order details",
    "Preparing secure payment",
    "Connecting to payment provider",
    "Redirecting to checkout",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="mx-auto w-2/5 space-y-5 rounded-2xl">
      <h1 className="text-center text-2xl font-bold">Preparing Your Payment</h1>
      <p className="text-accent-foreground text-center text-lg font-medium">
        Order ID: <span className="text-primary-foreground font-bold">{orderId}</span>
      </p>
      <div className="space-y-5 rounded-lg border bg-white p-5">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/30"></div>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            <p className="font-medium text-gray-700">{steps[currentStep]}</p>
          </div>

          {/* All Steps Preview */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${index <= currentStep ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <p className={`text-xs ${index <= currentStep ? "text-green-700" : "text-gray-400"}`}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Redirect Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <ExternalLink className="mt-0.5 h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">You'll be redirected shortly</p>
              <p className="mt-1 text-xs text-amber-600">
                Complete your payment securely on platform. You'll return here after payment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Security & Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <Shield className="mx-auto mb-2 h-6 w-6 text-green-600" />
            <p className="text-sm font-medium text-green-800">SSL Secured</p>
            <p className="text-xs text-green-600">256-bit encryption</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Zap className="mx-auto mb-2 h-6 w-6 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">Fast Checkout</p>
            <p className="text-xs text-blue-600">One-click payment</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrePaymentLoading;
