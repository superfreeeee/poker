import { ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';

interface IModalProxyOptions {
  id: string; // id for container
  parent?: HTMLElement;
}

export class ModalProxy {
  private options: Required<IModalProxyOptions>;
  private container: HTMLDivElement | null = null;
  private root: Root | null = null;

  constructor({ id, parent = document.body }: IModalProxyOptions) {
    this.options = { id, parent };
  }

  render(rootNode: ReactNode) {
    const root = this.createRoot();
    root.render(rootNode);
  }

  unmount() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container) {
      this.options.parent.removeChild(this.container);
      this.container = null;
    }
  }

  private createRoot(): Root {
    if (this.container && this.root) {
      return this.root;
    }
    const { id, parent } = this.options;

    const container = (this.container = document.createElement('div'));
    container.id = id;
    parent.appendChild(container);
    return (this.root = createRoot(container));
  }
}
