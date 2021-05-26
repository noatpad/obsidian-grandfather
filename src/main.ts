import { Plugin } from 'obsidian';
import { DateTime } from 'luxon';
import { ISettings, SettingsTab, DEFAULT_SETTINGS } from './settings';

export default class Grandfather extends Plugin {
  settings: ISettings
  statusBar: HTMLElement

  async onload() {
    console.log('Loading Grandfather...');

    this.settings = await this.loadData() || DEFAULT_SETTINGS;
    this.addSettingTab(new SettingsTab(this.app, this));

    this.statusBar = this.addStatusBarItem();
    this.updateClock();

    this.registerInterval(window.setInterval(() => this.updateClock(), 500));
  }

  onunload() {
    console.log('Unloading Grandfather...');
  }

  formatTimestamp() {
    const now = DateTime.now();
    switch (this.settings.format) {
      case '12h':     return now.toLocaleString(DateTime.TIME_SIMPLE);
      case '12hs':    return now.toLocaleString(DateTime.TIME_WITH_SECONDS);
      case '24h':     return now.toLocaleString(DateTime.TIME_24_SIMPLE);
      case '24hs':    return now.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
      case 'dt':      return now.toLocaleString(DateTime.DATETIME_MED);
      case 'dts':     return now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
      case 'custom':  return now.toFormat(this.settings.customFormat);
      default:        return "Invalid time format??";
    }
  }

  updateClock() {
    this.statusBar.setText(this.formatTimestamp());
  }
}
