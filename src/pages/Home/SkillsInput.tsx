import { FC, useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface SkillsInputProps {
  setValue: UseFormSetValue<FormData>;
}

const SkillsInput: FC<SkillsInputProps> = ({ setValue }) => {
  const [skills, setSkills] = useState<{ category: string; items: string[] }[]>([
    { category: '', items: [''] },
  ]);

  useEffect(() => {
    const skillsObject: Record<string, string[]> = {};

    skills.forEach(({ category, items }) => {
      if (category) {
        skillsObject[category] = items.filter(item => item !== '');
      }
    });

    setValue("skills", skillsObject); // Asegúrate de que 'skills' sea un Record<string, string[]>
  }, [skills, setValue]);

  const handleAddSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills[index].items.push('');
    setSkills(newSkills);
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items.splice(skillIndex, 1);
    setSkills(newSkills);
  };

  const handleChangeSkill = (categoryIndex: number, skillIndex: number, value: string) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items[skillIndex] = value;
    setSkills(newSkills);
  };

  const handleChangeCategory = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index].category = value;
    setSkills(newSkills);
  };

  const handleAddCategory = () => {
    setSkills([...skills, { category: '', items: [''] }]);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-3xl">Habilidades:</label>
      {skills.map((skill, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col gap-2">
          <input
            className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Categoría de habilidad"
            value={skill.category}
            onChange={(e) => handleChangeCategory(categoryIndex, e.target.value)}
          />

          {skill.items.map((item, skillIndex) => (
            <div key={skillIndex} className="flex items-center gap-2">
              <input
                className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Habilidad"
                value={item}
                onChange={(e) => handleChangeSkill(categoryIndex, skillIndex, e.target.value)}
              />
              {skillIndex >= 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                  className="p-2 bg-red-500 text-white rounded-lg"
                >
                  Eliminar habilidad
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddSkill(categoryIndex)}
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Agregar habilidad
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCategory}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar categoría
      </button>
    </div>
  );
};

export default SkillsInput;
