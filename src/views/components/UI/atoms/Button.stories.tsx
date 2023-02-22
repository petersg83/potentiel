import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: `Exemple de bouton`,
  disabled: false,
};
