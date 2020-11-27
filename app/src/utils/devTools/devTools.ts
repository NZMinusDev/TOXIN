export class WindowHrefHelper {
  private href: string;
  private params: URLSearchParams;

  constructor() {}

  public addValue(name: string, value: string): void {
    this.parseLocationURL();

    this.params.set(name, value);

    window.location.href = this.href + "?" + this.params.toString();
  }
  public getValue(name: string): string {
    this.parseLocationURL();

    return this.params.get(name);
  }

  private parseLocationURL() {
    this.href = window.location.href.split("?")[0];
    this.params = new URLSearchParams(window.location.search);
  }
}
