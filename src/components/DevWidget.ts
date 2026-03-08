export class DevWidget {
    constructor(container: HTMLElement) {
        this.render(container);
    }

    render(container: HTMLElement) {
        const widget = container.createDiv({ cls: 'nexus-widget dev-widget' });
        widget.createEl('h3', { text: 'Dev Widget' });
        widget.createEl('p', { text: 'Loading dev tools...' });
    }
}
