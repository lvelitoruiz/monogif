import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'image-component',
  styleUrl: 'image-component.css',
  shadow: false,
})
export class ImageComponent {

  @State() img: string = "";
  @State() label: string = "";

  @Prop() image: {legend: string, image:string};

  componentWillLoad() {
    this.parseImage();
  }

  @Watch('image')
  parseImage() {
    if (this.image) {
      this.img = this.image.image;
      this.label = this.image.legend;
    }
  }

  render() {
    return (
      <div class="w-full">
        <div class="w-full h-[240px] flex items-center bg-white dark:bg-black justify-center overflow-hidden rounded-xl">
          <img class="h-full w-full object-cover" src={this.img} />
        </div>
        <p class="text-center text-xs dark:text-white py-2">{this.label}</p>
      </div>
    );
  }

}
