import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep }) => {
  const { register, setValue, handleSubmit, formState: { errors } } = useFormContext<FormData>();
  const [aboutMe, setAboutMe] = useState<string[]>(['']);
  useEffect(() => {
    setValue("aboutMe", aboutMe);
  }, [aboutMe, setValue]);
  const handleAddDescription = () => {
    setAboutMe([...aboutMe, '']);
  };

  const handleRemoveDescription = (index: number) => {
    const newAboutMe = aboutMe.filter((_, i) => i !== index);
    setAboutMe(newAboutMe);
  };

  const handleChangeDescription = (index: number, value: string) => {
    const newAboutMe = [...aboutMe];
    newAboutMe[index] = value;
    setAboutMe(newAboutMe);
  };
  const onSubmit = (data: FormData) => {
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 items-center">
      <h2>Paso 2: Información Personal</h2>

      <section className="w-full flex flex-col gap-2">
        <label className="text-2xl">Sobre Mí:</label>
        {aboutMe.map((description, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <textarea
                id={`aboutMe.${index}`}
                className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Descripción"
                {...register(`aboutMe.${index}`, { required: "Este campo es obligatorio" })}
                value={description}
                onChange={(e) => handleChangeDescription(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDescription(index)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
            {errors.aboutMe && errors.aboutMe[index] && (
              <p className="text-sm text-red-500">{errors.aboutMe[index]?.message}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDescription}
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Agregar Descripción
        </button>
      </section>
    </form>
  );
};

export default Step2;
