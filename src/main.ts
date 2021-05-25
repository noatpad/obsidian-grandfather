import { Plugin } from 'obsidian';
import { DateTime } from 'luxon';

class Grandfather extends Plugin {
  statusBar: HTMLElement

  async onload() {
    console.log('Loading plugin...');

    this.statusBar = this.addStatusBarItem();
    this.display();

    this.registerInterval(window.setInterval(() => this.display(), 500));
  }

  async onunload() {
    console.log('Unloading plugin...');
  }

  display() {
    const now = DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS);
    this.statusBar.setText(now);
  }
}

export default Grandfather;
