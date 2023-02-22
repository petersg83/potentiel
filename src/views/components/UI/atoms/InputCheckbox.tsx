import React, { ComponentProps, FC } from 'react';

type InputCheckboxProps = ComponentProps<'input'>;

export const InputCheckbox: FC<InputCheckboxProps> = ({ className = '', ...props }) => (
  <input
    type="checkbox"
    className={`border-black outline-none bg-transparent focus:border-black cursor-pointer checked:bg-blue-france-sun-base disabled:bg-neutral-200 disabled:border-grey-625-base ${className}`}
    {...props}
  />
);
