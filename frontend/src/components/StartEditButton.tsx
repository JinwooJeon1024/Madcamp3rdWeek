import React from 'react';


type StartEditButtonProps = {
    label : string;
}

export const StartEditButton : React.FC<StartEditButtonProps> = ({label}) => {
  return (
    <div>
      <button>{label}</button>
    </div>
  );
};


