import readme from './readme.md';

export default {
    // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
    title: 'components/Switch',
    notes: readme
};

const Template = (args) => `<switch-component status="${args.status}"></switch-component>`;

export const initial = Template.bind({});
initial.args = {
  status: false
};