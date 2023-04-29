import { newE2EPage } from '@stencil/core/testing';

describe('paragraph-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<paragraph-text></paragraph-text>');

    const element = await page.find('paragraph-text');
    expect(element).toHaveClass('hydrated');
  });
});
