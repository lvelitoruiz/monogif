import readme from './readme.md';

export default {
    // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
    title: 'components/Buttoncomponent',
    notes: readme
};

const Template = (args) => `<button-component class="mb-2" status="${args.status}" text="${args.texto}"></button-component>`;

export const ActiveButton = Template.bind({});
ActiveButton.args = {
  texto: 'This is an active Button',
  status: 'active'
};

export const InactiveButton = Template.bind({});
InactiveButton.args = {
  texto: 'This is an inactive Button',
  status: 'inactive'
};