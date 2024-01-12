import React from 'react';

type StartEditButtonProps = {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const StartEditButton: React.FC<StartEditButtonProps> = ({ label, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};
