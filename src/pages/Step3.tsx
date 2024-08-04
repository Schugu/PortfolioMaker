import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const socialOptions = [
  { value: "Github", label: "Github" },
  { value: "Linkedin", label: "Linkedin" },
  { value: "Instagram", label: "Instagram" },
  { value: "FreeCodeCamp", label: "FreeCodeCamp" },
  { value: "Email", label: "Email" },
  { value: "Twitter", label: "Twitter" },
  { value: "Facebook", label: "Facebook" }, 
  { value: "Behance", label: "Behance" },   
  { value: "Dribbble", label: "Dribbble" }, 
  { value: "Medium", label: "Medium" }, 
  { value: "Pinterest", label: "Pinterest" }, 
  { value: "YouTube", label: "YouTube" }, 
  { value: "Reddit", label: "Reddit" },
  { value: "Snapchat", label: "Snapchat" }, 
  { value: "TikTok", label: "TikTok" }, 
  { value: "Vimeo", label: "Vimeo" }, 
  { value: "Flickr", label: "Flickr" },
  { value: "SoundCloud", label: "SoundCloud" },  
  { value: "Clubhouse", label: "Clubhouse" }, 
];

export default function Step3({ nextStep, prevStep }: Step3Props) {
  const { setValue, handleSubmit, getValues } = useFormContext<FormData>();
  const [socials, setSocials] = useState<{ name: string; link: string }[]>(getValues("linksSocialNetworks") ? Object.entries(getValues("linksSocialNetworks")).map(([name, link]) => ({ name, link })) : [{ name: '', link: '' }]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar el mensaje de error

  useEffect(() => {
    const socialObject = socials.reduce((acc, { name, link }) => {
      if (name && link) {
        acc[name] = link;
      }
      return acc;
    }, {} as Record<string, string>);

    setValue("linksSocialNetworks", socialObject);
  }, [socials, setValue]);

  const handleAddSocial = () => {
    setSocials([...socials, { name: '', link: '' }]);
  };

  const handleRemoveSocial = (index: number) => {
    const newSocials = socials.filter((_, i) => i !== index);
    setSocials(newSocials);
  };

  const handleChangeSocial = (index: number, field: 'name' | 'link', value: string) => {
    const newSocials = [...socials];
    newSocials[index][field] = value;
    setSocials(newSocials);
  };

  const onSubmit = (data: FormData) => {
    const hasInvalidSocials = socials.some((social) => {
      return social.name === "" || (social.name !== "" && social.link === "");
    });

    if (hasInvalidSocials) {
      setError("Por favor, completa todos los campos de redes sociales correctamente.");
      return; 
    }

    setError(null); 
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 items-center">
      <h2>Paso 3: Redes Sociales</h2>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-3xl">Redes Sociales:</label>
        {socials.map((social, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <select
                id={`social-${index}-name`}
                className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={social.name}
                onChange={(e) => handleChangeSocial(index, 'name', e.target.value)}
              >
                <option value="">Seleccionar red social</option>
                {socialOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <input
                id={`social-${index}-link`}
                className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={social.link}
                onChange={(e) => handleChangeSocial(index, 'link', e.target.value)}
                placeholder="Enlace de la red social"
              />

              {index >= 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(index)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSocial}
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Agregar otra red social
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
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
