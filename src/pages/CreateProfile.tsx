import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { FormData } from "@/types/types.ts";
import Step1 from './Step1.tsx';
import Step2 from './Step2.tsx';
import Step3 from './Step3.tsx';
import StepIndicator from './StepIndicator.tsx';


export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const methods = useForm<FormData>({
    defaultValues: {
      fullName: '',
      nacionality: '',
      titles: [''],
      linksSocialNetworks: { "": "" }
    }
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (data: FormData) => {
    // Lógica de envío del formulario completo
    console.log(data);
  };

  const steps = [
    <Step1 nextStep={nextStep} />,
    <Step2 prevStep={prevStep} nextStep={nextStep} />,
    <Step3 prevStep={prevStep} nextStep={nextStep} />
  ];

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-blue-950'>
      <div className='w-11/12 my-10 flex-grow flex flex-col p-10 gap-4 justify-start items-center
      border-2 border-yellow-400 rounded'>
        <StepIndicator currentStep={currentStep} steps={steps.length} />
        <FormProvider {...methods}>
          {steps[currentStep - 1]}
        </FormProvider>
      </div>
    </div>
  );
}


