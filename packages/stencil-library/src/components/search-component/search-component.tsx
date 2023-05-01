import { Component, Event, EventEmitter, State, h } from '@stencil/core';

@Component({
  tag: 'search-component',
  styleUrl: 'search-component.css',
  shadow: false,
})
export class SearchComponent {

  @State() value: string;

  @Event() inputCompleted: EventEmitter<any>;

  handleChange(event) {
    this.value = event.target.value;
    this.inputCompleted.emit(this.value);
  }

  render() {
    return (
      <div class="flex items-center gap-4 w-full">
        <div class="bg-white duration:300 w-full md:w-full border border-[#E5E5E5] dark:border-[#57585D] dark:bg-[#36373C] shadow-2xl rounded-xl">
          <div class="flex items-center w-full p-3 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-[#C9C8CB] w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input class="w-full bg-transparent dark:text-white duration-300 outline-0" value={this.value} onInput={(event) => this.handleChange(event)} placeholder="Search GYF" type="text" />
              {/* <p class="whitespace-nowrap dark:text-white duration-300 text-sm">Clean</p> */}
          </div>
        </div>
      </div>
    );
  }

}
