import { App, PluginSettingTab, Setting } from 'obsidian';
import NexusHomePlugin from '../main';

export interface NexusHomeSettings {
    financialApiKey: string;
}

export const DEFAULT_SETTINGS: NexusHomeSettings = {
    financialApiKey: ''
}

export class SettingsTab extends PluginSettingTab {
    plugin: NexusHomePlugin;

    constructor(app: App, plugin: NexusHomePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: 'Nexus Home Settings'});

        new Setting(containerEl)
            .setName('Financial API Key')
            .setDesc('API key for pulling your financial information')
            .addText(text => text
                .setPlaceholder('Enter your secret key')
                .setValue(this.plugin.settings?.financialApiKey || '')
                .onChange(async (value) => {
                    this.plugin.settings.financialApiKey = value;
                    await this.plugin.saveSettings();
                }));
    }
}
