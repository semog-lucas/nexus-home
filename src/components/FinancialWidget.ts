export class FinancialWidget {
    constructor(container: HTMLElement) {
        this.render(container);
    }

    render(container: HTMLElement) {
        const widget = container.createDiv({ cls: 'nexus-widget financial-widget' });
        widget.createEl('h3', { text: 'Financial Widget' });
        widget.createEl('p', { text: 'Loading financial data...' });
    }
}
