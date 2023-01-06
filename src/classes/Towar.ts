export class Towar {
  nazwa: string;
  opis?: string;
  cena: number;
  static isValid(item: any): item is Towar {
    if ((item.nazwa && item.cena) || (item.nazwa && item.cena && item.opis)) {
      return true;
    } else {
      return false;
    }
  }
}
