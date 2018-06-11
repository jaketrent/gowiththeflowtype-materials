declare class TemplateResult {
  values: any[];
  getHTML(): () => string;
}

declare module 'lit-html' {
  declare export function html(template: string[]): TemplateResult
  declare export function render(
    result: TemplateResult,
    container: ?Element | ?DocumentFragment
  ): void
}
