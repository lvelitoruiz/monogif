import { newSpecPage } from '@stencil/core/testing';
import { SearchComponent } from '../search-component';

describe('search-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SearchComponent],
      html: `<search-component></search-component>`,
    });
    expect(page.root).toEqualHtml(`
      <search-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </search-component>
    `);
  });
});
