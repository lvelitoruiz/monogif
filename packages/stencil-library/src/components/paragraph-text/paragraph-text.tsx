import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'paragraph-text',
  styleUrl: 'paragraph-text.css',
  shadow: false,
})
export class ParagraphText {

  @State() type: string = "inactive";

  @Prop() size: string;
  @Prop() text: string;


  componentWillLoad() {
    this.parseType();
  }

  @Watch('size')
  @Watch('text')
  parseType() {
    if (this.size) {
      this.type = this.size;
    }
  }

  getSize = (size: string) => {
    switch (size) {
      case 'small':
        return "text-xs dark:text-white pt-2"
      case 'big':
        return "text-xl dark:text-white pt-2"
      case 'subtitle':
        return "text-2xl title dark:text-white pt-2 uppercase"
      case 'title':
        return "text-5xl title font-bold dark:text-white pt-2 uppercase"
      default:
        return "text-sm dark:text-white pt-2"
    }
  }

  render() {
    return (
      <p class={this.getSize(this.size)}>{this.text}</p>
    );
  }

}
