import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2({ nextStep, prevStep }: Step2Props) {
  const { register, setValue, handleSubmit, formState: { errors }, getValues } = useFormContext<FormData>();
  const [aboutMe, setAboutMe] = useState<string[]>(getValues("aboutMe") || ['']);
  const [hobbies, setHobbies] = useState<string[]>(getValues("hobbies") || ['']);
  const [textContact, setTextContact] = useState<string[]>(getValues("textContact") || ['']);

  useEffect(() => {
    setValue("aboutMe", aboutMe);
  }, [aboutMe, setValue]);

  useEffect(() => {
    setValue("hobbies", hobbies);
  }, [hobbies, setValue]);

  useEffect(() => {
    setValue("textContact", textContact);
  }, [textContact, setValue]);

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

  const handleAddHobby = () => {
    setHobbies([...hobbies, '']);
  };

  const handleRemoveHobby = (index: number) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(newHobbies);
  };

  const handleChangeHobby = (index: number, value: string) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = value;
    setHobbies(newHobbies);
  };

  const handleAddText = () => {
    setTextContact([...textContact, '']);
  };

  const handleRemoveText = (index: number) => {
    const newTextContact = textContact.filter((_, i) => i !== index);
    setTextContact(newTextContact);
  };

  const handleChangeText = (index: number, value: string) => {
    const newTextContact = [...textContact];
    newTextContact[index] = value;
    setTextContact(newTextContact);
  };

  const onSubmit = () => {
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
                className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

      <section className="w-full flex flex-col gap-2 mt-4">
        <label className="text-2xl">Hobbies:</label>
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <textarea
                id={`hobbies.${index}`}
                className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Hobby"
                {...register(`hobbies.${index}`, { required: "Este campo es obligatorio" })}
                value={hobby}
                onChange={(e) => handleChangeHobby(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(index)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
            {errors.hobbies && errors.hobbies[index] && (
              <p className="text-sm text-red-500">{errors.hobbies[index]?.message}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddHobby}
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Agregar Hobby
        </button>
      </section>

      <section className="w-full flex flex-col gap-2 mt-4">
        <label className="text-2xl">Texto de Contacto:</label>
        {textContact.map((text, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <textarea
                id={`textContact.${index}`}
                className="block w-full p-2.5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Texto de Contacto"
                {...register(`textContact.${index}`, { required: "Este campo es obligatorio" })}
                value={text}
                onChange={(e) => handleChangeText(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveText(index)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
            {errors.textContact && errors.textContact[index] && (
              <p className="text-sm text-red-500">{errors.textContact[index]?.message}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddText}
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Agregar Texto de Contacto
        </button>
      </section>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded-lg">
          Anterior
        </button>
        <button type="submit" className="p-2 bg-green-500 text-white rounded-lg">
          Siguiente
        </button>
      </div>
    </form>
  );
}