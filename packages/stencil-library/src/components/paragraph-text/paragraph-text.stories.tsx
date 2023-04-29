import readme from './readme.md';

export default {
    // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
    title: 'components/Text',
    notes: readme
};

const Template = (args) => `<paragraph-text class="mb-2" size="${args.size}" text="${args.texto}"></paragraph-text>`;

export const SmallText = Template.bind({});
SmallText.args = {
  texto: 'This is a text',
  size: 'small'
};

export const NormalText = Template.bind({});
NormalText.args = {
  texto: 'This is a text',
  size: ''
};

export const BigText = Template.bind({});
BigText.args = {
  texto: 'This is a text',
  size: 'big'
};

export const SubTitle = Template.bind({});
SubTitle.args = {
  texto: 'This is a text',
  size: 'subtitle'
};

export const TitleText = Template.bind({});
TitleText.args = {
  texto: 'This is a text',
  size: 'title'
};
