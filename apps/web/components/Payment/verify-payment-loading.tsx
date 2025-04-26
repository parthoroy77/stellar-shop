"use client";

import { Card, CardContent, CardHeader } from "@ui/index";
import { Clock, CreditCard, Shield } from "lucide-react";

const VerifyPaymentLoading = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Main Processing Card */}
      <Card className="border">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-sm">Please wait...</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verifying Your Payment</h1>
          <p className="text-gray-600">Please wait while we securely process your transaction</p>
        </CardHeader>
      </Card>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Secure Transaction</p>
              <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Steps */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
              <p className="text-sm text-gray-600">Verifying order details</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" style={{ animationDelay: "0.5s" }}></div>
              <p className="text-sm text-gray-600">Processing with payment provider</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <p className="text-sm text-gray-400">Confirming transaction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Time */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Clock className="h-4 w-4" />
          <p className="text-sm">Estimated time: 30-60 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPaymentLoading;
