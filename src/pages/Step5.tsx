import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "@/types/types.ts";

interface Step5Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step5({ nextStep, prevStep }: Step5Props) {
  const { setValue, handleSubmit, getValues } = useFormContext<FormData>();
  const [workExperience, setWorkExperience] =  useState<FormData["workExperience"]>(
    getValues("workExperience") || [
      {
        title: '',
        company: '',
        date: '',
        modality: '',
        workplace: '',
        country: '',
        description: [''],
        tasks: [''],
        infoLink: ''
      }
    ]
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue("workExperience", workExperience);
  }, [workExperience, setValue]);

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        title: '',
        company: '',
        date: '',
        modality: '',
        workplace: '',
        country: '',
        description: [''],
        tasks: [''],
        infoLink: ''
      }
    ]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    const newWorkExperience = workExperience.filter((_, i) => i !== index);
    setWorkExperience(newWorkExperience);
  };

  const handleChangeWorkExperience = (index: number, field: string, value: string | string[]) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index] = {
      ...newWorkExperience[index],
      [field]: value
    };
    setWorkExperience(newWorkExperience);
  };

  const handleAddDescription = (index: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].description.push('');
    setWorkExperience(newWorkExperience);
  };

  const handleRemoveDescription = (index: number, descIndex: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].description.splice(descIndex, 1);
    setWorkExperience(newWorkExperience);
  };

  const handleChangeDescription = (index: number, descIndex: number, value: string) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].description[descIndex] = value;
    setWorkExperience(newWorkExperience);
  };

  const handleAddTask = (index: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].tasks.push('');
    setWorkExperience(newWorkExperience);
  };

  const handleRemoveTask = (index: number, taskIndex: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].tasks.splice(taskIndex, 1);
    setWorkExperience(newWorkExperience);
  };

  const handleChangeTask = (index: number, taskIndex: number, value: string) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index].tasks[taskIndex] = value;
    setWorkExperience(newWorkExperience);
  };

  const onSubmit = (data: FormData) => {
    const hasInvalidWorkExperience = workExperience.some((experience) => {
      return (
        experience.title === '' ||
        experience.company === '' ||
        experience.date === '' ||
        experience.modality === '' ||
        experience.workplace === '' ||
        experience.country === '' ||
        experience.description.includes('') ||
        experience.tasks.includes('')
      );
    });

    if (hasInvalidWorkExperience) {
      setError("Por favor, completa todos los campos de experiencia laboral correctamente.");
      return;
    }

    setError(null);
    console.log(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2 items-center">
      <h2>Paso 5: Experiencia Laboral</h2>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-3xl">Experiencia Laboral:</label>
        {workExperience.map((experience, index) => (
          <div key={index} className="flex flex-col gap-2 border p-2 rounded-lg">
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Título"
              value={experience.title}
              onChange={(e) => handleChangeWorkExperience(index, 'title', e.target.value)}
            />
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Empresa"
              value={experience.company}
              onChange={(e) => handleChangeWorkExperience(index, 'company', e.target.value)}
            />
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Fecha"
              value={experience.date}
              onChange={(e) => handleChangeWorkExperience(index, 'date', e.target.value)}
            />
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Modalidad"
              value={experience.modality}
              onChange={(e) => handleChangeWorkExperience(index, 'modality', e.target.value)}
            />
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Lugar de trabajo"
              value={experience.workplace}
              onChange={(e) => handleChangeWorkExperience(index, 'workplace', e.target.value)}
            />
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="País"
              value={experience.country}
              onChange={(e) => handleChangeWorkExperience(index, 'country', e.target.value)}
            />
            <label>Descripción:</label>
            {experience.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex items-center gap-2">
                <textarea
                  className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                  placeholder="Descripción"
                  value={desc}
                  onChange={(e) => handleChangeDescription(index, descIndex, e.target.value)}
                />
                {descIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDescription(index, descIndex)}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddDescription(index)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Agregar Descripción
            </button>

            <label>Tareas:</label>
            {experience.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center gap-2">
                <input
                  className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                  type="text"
                  placeholder="Tarea"
                  value={task}
                  onChange={(e) => handleChangeTask(index, taskIndex, e.target.value)}
                />
                {taskIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(index, taskIndex)}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddTask(index)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Agregar Tarea
            </button>
            
            <input
              className="block w-full p-2.5 text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              type="text"
              placeholder="Enlace de Información"
              value={experience.infoLink}
              onChange={(e) => handleChangeWorkExperience(index, 'infoLink', e.target.value)}
            />
            
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveWorkExperience(index)}
                className="mt-2 p-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar Experiencia Laboral
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddWorkExperience}
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Agregar Experiencia Laboral
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
