import readme from './readme.md';

export default {
    // this creates a ‘Components’ folder and a ‘MyComponent’ subfolder
    title: 'components/Image',
    notes: readme
};

const Template = (args) => `<image-component image="${args.image}"></image-component>`;

export const ImageItem = Template.bind({});
ImageItem.args = {
  image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThmYzVjMGJiZDU0MDdhNGUyOGJiZDEyZTQwZDlkOGExMDk2Y2EwNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o6ZtrtQMscwc87A6Q/giphy.gif'
};