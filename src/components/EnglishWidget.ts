export class EnglishWidget {
    constructor(container: HTMLElement) {
        this.render(container);
    }

    render(container: HTMLElement) {
        const widget = container.createDiv({ cls: 'nexus-widget english-widget' });
        widget.createEl('h3', { text: 'English Widget' });
        widget.createEl('p', { text: 'Loading vocabulary...' });
    }
}
