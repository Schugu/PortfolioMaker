import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { MediaTypes } from "@/types/types.ts";

import { FormData } from "@/types/types.ts";
import Step1 from './Step1.tsx';
import Step2 from './Step2.tsx';
import Step3 from './Step3.tsx';
import Step4 from './Step4.tsx';
import Step5 from './Step5.tsx';
import Step6 from './Step6.tsx';
import Step7 from './Step7.tsx';
import StepIndicator from './StepIndicator.tsx';

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const methods = useForm<FormData>({
    defaultValues: {
      titles: [''],
      linksSocialNetworks: { "": "" }
    }
  });
  const [media, setMedia] = useState<MediaTypes>({
    profilePicture: null,
    cv: null,
    certificates: []
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleDownloadAllMedia = async (data: FormData) => {
    const zip = new JSZip();
    const profileFolder = zip.folder("profile");
    const educationFolder = profileFolder?.folder("education");

    if (media.profilePicture) {
      profileFolder?.file('profilePicture.png', media.profilePicture);
    }

    if (media.cv) {
      profileFolder?.file('CV.pdf', media.cv);
    }

    media.certificates.forEach((file, index) => {
      educationFolder?.file(`${index + 1}.png`, file);
    });

    const dataValid = {
      ...data,
      profilePicture: "/profile/profilePicture.png"
    };
    profileFolder?.file('profile.json', JSON.stringify(dataValid, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "profile.zip");
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleDownloadAllMedia(data);
  };

  const steps = [
    <Step1 nextStep={nextStep} />,
    <Step2 prevStep={prevStep} nextStep={nextStep} />,
    <Step3 prevStep={prevStep} nextStep={nextStep} />,
    <Step4 prevStep={prevStep} nextStep={nextStep} />,
    <Step5 prevStep={prevStep} nextStep={nextStep} />,
    <Step6 prevStep={prevStep} nextStep={nextStep} media={media} setMedia={setMedia} />,
    <Step7 prevStep={prevStep} handleSubmit={methods.handleSubmit(onSubmit)} />,
  ];

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white'>
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
