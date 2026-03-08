import { Plugin, WorkspaceLeaf } from 'obsidian';
import { HomeView, VIEW_TYPE_HOME } from './views/HomeView';
import { NexusSettingTab, DEFAULT_SETTINGS, NexusSettings } from './settings';

export default class NexusHomePlugin extends Plugin {
    settings!: NexusSettings;

    async onload() {
        console.log('Loading Nexus Home plugin...');

        await this.loadSettings();

        // Register the View
        this.registerView(
            VIEW_TYPE_HOME,
            (leaf: WorkspaceLeaf) => new HomeView(leaf)
        );

        // Add Ribbon Icon
        this.addRibbonIcon('layout-dashboard', 'Open Nexus Home', () => {
            this.activateView();
        });

        // Add Command Palette Option
        this.addCommand({
            id: 'open-nexus-home',
            name: 'Open Home Dashboard',
            callback: () => {
                this.activateView();
            }
        });

        // Add Settings Tab
        this.addSettingTab(new NexusSettingTab(this.app, this));
    }

    onunload() {
        console.log('Unloading Nexus Home plugin...');
    }

    async activateView() {
        const { workspace } = this.app;
        
        // Return if view is already active
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_HOME);
        
        if (leaves.length > 0) {
            leaf = leaves[0];
            workspace.setActiveLeaf(leaf, { focus: true });
            return;
        }

        // Create new leaf
        leaf = workspace.getLeaf(false);
        if (leaf) {
            await leaf.setViewState({
                type: VIEW_TYPE_HOME,
                active: true,
            });
            workspace.revealLeaf(leaf);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
