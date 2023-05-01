import { Component, State, Event, EventEmitter, Watch, h } from '@stencil/core';

@Component({
  tag: 'switch-component',
  styleUrl: 'switch-component.css',
  shadow: false,
})
export class SwitchComponent {

  @State() theme: string = "Ligth";

  @State() status: boolean = false;

  @Event() changeTheme: EventEmitter<any>;

  @Watch('theme')
  parseStatus(event: Event) {
    let targetElement = event.target as HTMLInputElement;
    let valueOfEl = targetElement.checked;
    if (targetElement && valueOfEl) {
      this.theme = "Dark";
      this.changeTheme.emit("dark")
    } else {
      this.theme = "Ligth";
      this.changeTheme.emit("ligth");
    }
  }

  render() {
    return (
      <div class="flex items-center gap-1">
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" name="toggle" id="toggle" onChange={(event) => this.parseStatus(event)} class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-[#57585D] border-4 border-[#36373C] appearance-none cursor-pointer" />
          <label htmlFor="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-[#36373C] cursor-pointer"></label>
        </div>
        <label htmlFor="toggle" class="dark:text-white whitespace-nowrap cursor-pointer text-sm">{this.theme}</label>
      </div>
    );
  }

}
          