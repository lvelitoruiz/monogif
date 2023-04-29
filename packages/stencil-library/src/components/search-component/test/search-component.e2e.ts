import { newE2EPage } from '@stencil/core/testing';

describe('search-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<search-component></search-component>');

    const element = await page.find('search-component');
    expect(element).toHaveClass('hydrated');
  });
});
