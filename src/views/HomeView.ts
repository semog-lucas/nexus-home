import { ItemView, WorkspaceLeaf } from 'obsidian';
import { FinancialWidget } from '../components/FinancialWidget';
import { EnglishWidget } from '../components/EnglishWidget';
import { DevWidget } from '../components/DevWidget';

export const VIEW_TYPE_HOME = 'nexus-home-view';

export class HomeView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return VIEW_TYPE_HOME;
    }

    getDisplayText(): string {
        return 'Nexus Home';
    }

    getIcon(): string {
        return 'home';
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();

        const gridContainer = container.createDiv({ cls: 'nexus-home-container' });

        // Initialize Widgets
        new FinancialWidget(gridContainer);
        new EnglishWidget(gridContainer);
        new DevWidget(gridContainer);
    }

    async onClose() {
        // Cleanup if needed
    }
}
