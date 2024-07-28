import { FC, useState, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface SocialInputProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
}

const SocialInput: FC<SocialInputProps> = ({ setValue }) => {
  const [socials, setSocials] = useState([{ name: '', link: '' }]);

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

  return (
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
              <option value="Github">Github</option>
              <option value="Linkedin">Linkedin</option>
              <option value="Instagram">Instagram</option>
              <option value="FreeCodeCamp">FreeCodeCamp</option>
              <option value="Email">Email</option>
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
    </div>
  );
};

export default SocialInput;
