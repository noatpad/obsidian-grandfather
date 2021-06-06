import { App, PluginSettingTab, Setting } from "obsidian";
import Grandfather from './main'

type Format = '12h' | '12hs' | '24h' | '24hs' | 'dt' | 'dts' | 'custom';

export interface ISettings {
  format: Format,
  customFormat: string
};

export const DEFAULT_SETTINGS: ISettings = {
  format: '12h',
  customFormat: ''
};

const FORMAT_OPTIONS = {
  '12h': '12-hour',
  '12hs': '12-hour with seconds',
  '24h': '24-hour',
  '24hs': '24-hour with seconds',
  'dt': 'Date and time',
  'dts': 'Date and time with seconds',
  'custom': 'Custom format'
};

const CUSTOM_FORMAT_DESCRIPTION = new DocumentFragment();
CUSTOM_FORMAT_DESCRIPTION.append(
  createSpan({ text: 'Type in a custom format to use. Look ' }),
  createEl('a', { text: 'here', href: 'https://momentjs.com/docs/#/displaying/format/' }),
  createSpan({ text: ' for more information' })
);

export class SettingsTab extends PluginSettingTab {
  plugin: Grandfather;

  constructor(app: App, plugin: Grandfather) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async saveSettings(refresh: Boolean = false) {
    await this.plugin.saveData(this.plugin.settings);
    this.plugin.updateClock();
    if (refresh) {
      this.display();
    }
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Format')
      .setDesc('Set a time format to display')
      .addDropdown(dropdown => dropdown
        .addOptions(FORMAT_OPTIONS)
        .setValue(this.plugin.settings.format)
        .onChange(async (val: Format) => {
          this.plugin.settings.format = val;
          await this.saveSettings(true);
        }));

    if (this.plugin.settings.format === 'custom') {
      new Setting(containerEl)
        .setName('Custom Format')
        .setDesc(CUSTOM_FORMAT_DESCRIPTION)
        .addText(text => text
          .setPlaceholder('hh:mm a')
          .setValue(this.plugin.settings.customFormat)
          .onChange(async (val: string) => {
            this.plugin.settings.customFormat = val;
            await this.saveSettings();
          }));
    }
  }
}
