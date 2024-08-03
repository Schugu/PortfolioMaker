import React from 'react';

interface Step3Props {
  prevStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: {
    name: string;
    email: string;
    age: string;
    address: string;
  };
}

const Step3: React.FC<Step3Props> = ({ prevStep, handleChange, handleSubmit, formData }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Paso 3: Información Adicional</h2>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Dirección"
      />
      <button type="button" onClick={prevStep}>Anterior</button>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Step3;
