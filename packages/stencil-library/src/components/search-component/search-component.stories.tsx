import readme from './readme.md';

export default {
    // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
    title: 'components/Search',
    notes: readme
};

const Template = (args) => `<search-component status="${args.status}"></search-component>`;

export const Initial = Template.bind({});
Initial.args = {
  status: false
};