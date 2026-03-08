import { App, PluginSettingTab, Setting } from 'obsidian';
import NexusHomePlugin from './main';

export interface NexusSettings {
    layoutMode: 'Preset' | 'Custom';
    selectedTemplate: 'Developer' | 'Financial' | 'Minimal';
    gridColumns: number;
}

export const DEFAULT_SETTINGS: NexusSettings = {
    layoutMode: 'Preset',
    selectedTemplate: 'Developer',
    gridColumns: 3
}

export class NexusSettingTab extends PluginSettingTab {
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
            .setName('Layout Mode')
            .setDesc('Choose the layout mode for your dashboard')
            .addDropdown(dropdown => dropdown
                .addOption('Preset', 'Preset')
                .addOption('Custom', 'Custom')
                .setValue(this.plugin.settings?.layoutMode || 'Preset')
                .onChange(async (value) => {
                    this.plugin.settings.layoutMode = value as 'Preset' | 'Custom';
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Selected Template')
            .setDesc('Choose your dashboard template')
            .addDropdown(dropdown => dropdown
                .addOption('Developer', 'Developer')
                .addOption('Financial', 'Financial')
                .addOption('Minimal', 'Minimal')
                .setValue(this.plugin.settings?.selectedTemplate || 'Developer')
                .onChange(async (value) => {
                    this.plugin.settings.selectedTemplate = value as 'Developer' | 'Financial' | 'Minimal';
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Grid Columns')
            .setDesc('Number of columns in the grid (2 to 6)')
            .addSlider(slider => slider
                .setLimits(2, 6, 1)
                .setValue(this.plugin.settings?.gridColumns || 3)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.gridColumns = value;
                    await this.plugin.saveSettings();
                }));
    }
}
