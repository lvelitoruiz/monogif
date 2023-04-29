import { newSpecPage } from '@stencil/core/testing';
import { SwitchComponent } from '../switch-component';

describe('switch-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SwitchComponent],
      html: `<switch-component></switch-component>`,
    });
    expect(page.root).toEqualHtml(`
      <switch-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </switch-component>
    `);
  });
});
