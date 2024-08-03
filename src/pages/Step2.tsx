import React from 'react';

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    name: string;
    email: string;
    age: string;
    address: string;
  };
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, handleChange, formData }) => {
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación del paso 2
    if (!formData.email) {
      alert('El email es obligatorio');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Paso 2: Información de Contacto</h2>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Siguiente</button>
    </form>
  );
};

export default Step2;
