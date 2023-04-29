import { Component, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'button-component',
  styleUrl: 'button-component.css',
  shadow: false,
})
export class ButtonComponent {

  
  @State() type: string = "inactive";

  @Prop() status: string;
  @Prop() text: string;

  componentWillLoad() {
    this.parseType();
  }

  @Watch('status')
  @Watch('text')
  parseType() {
    if (this.status) {
      this.type = this.status;
    }
  }

  switchButtons = (status: string) => {
    switch (status) {
      case 'active':
        return "bg-[#c3c3c3] duration-500 dark:bg-[#57585D] dark:text-white px-3 py-1 rounded-md hover:bg-[#68D391] hover:text-white dark:hover:bg-[#68D391] dark:hover:text-white"
      default:
        return "bg-transparent duration-500 hover:text-[#68D391] dark:hover:text-[#68D391] px-3 dark:text-white py-1 rounded-md"
    }
  }

  render() {
    return (
      <button class={this.switchButtons(this.type)}>{this.text}</button>
    );
  }

}
