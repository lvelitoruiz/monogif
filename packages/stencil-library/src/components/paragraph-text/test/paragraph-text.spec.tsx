import { newSpecPage } from '@stencil/core/testing';
import { ParagraphText } from '../paragraph-text';

describe('paragraph-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ParagraphText],
      html: `<paragraph-text></paragraph-text>`,
    });
    expect(page.root).toEqualHtml(`
      <paragraph-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </paragraph-text>
    `);
  });
});
