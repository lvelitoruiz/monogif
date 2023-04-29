import { newE2EPage } from '@stencil/core/testing';

describe('switch-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<switch-component></switch-component>');

    const element = await page.find('switch-component');
    expect(element).toHaveClass('hydrated');
  });
});
