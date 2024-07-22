import React, { ReactNode } from 'react';

interface ContainerProps{
    children:ReactNode
}
const FormContainer:React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
