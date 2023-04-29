import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'image-component',
  styleUrl: 'image-component.css',
  shadow: true,
})
export class ImageComponent {

  @State() img: string = "";

  @Prop() image: string;

  componentWillLoad() {
    this.parseImage();
  }

  @Watch('image')
  parseImage() {
    if (this.image) {
      this.img = this.image;
    }
  }

  render() {
    return (
      <div class="w-full h-[240px] flex items-center bg-white dark:bg-black justify-center overflow-hidden rounded-xl">
        <img class="max-h-full max-w-full rounded-xl" src={this.img} />
      </div>
    );
  }

}
