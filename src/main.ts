import { Plugin, moment } from 'obsidian';
import { ISettings, SettingsTab, DEFAULT_SETTINGS } from './settings';

export default class Grandfather extends Plugin {
  settings: ISettings
  statusBar: HTMLElement

  async onload() {
    console.log('Loading Grandfather...');

    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new SettingsTab(this.app, this));

    this.statusBar = this.addStatusBarItem();
    this.updateClock();

    this.registerInterval(window.setInterval(() => this.updateClock(), 500));
  }

  onunload() {
    console.log('Unloading Grandfather...');
  }

  formatTimestamp() {
    const now = moment();
    const { format, customFormat } = this.settings;
    switch (format) {
      case '12h':     return now.format('h:mm a');
      case '12hs':    return now.format('h:mm:ss a');
      case '24h':     return now.format('H:mm');
      case '24hs':    return now.format('H:mm:ss');
      case 'dt':      return now.format('MMM D, Y h:mm a');
      case 'dts':     return now.format('MMM D, Y h:mm:ss a');
      case 'custom':  return now.format(customFormat);
      default:        return "Invalid time format??";
    }
  }

  updateClock() {
    this.statusBar.setText(this.formatTimestamp());
  }
}
