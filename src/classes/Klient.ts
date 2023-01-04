export class Klient {
  imie: string;
  nazwisko: string;
  email: string;
  numerTelefonu: string;
  idFirmy?: number;

  static isValid(data: any): data is Klient {
    const params = Object.keys(data);

    if (
      params.length === 4 &&
      params.includes("imie") &&
      params.includes("nazwisko") &&
      params.includes("email") &&
      params.includes("numerTelefonu")
    ) {
      return true;
    } else if (
      params.length === 5 &&
      params.includes("idFirmy") &&
      params.includes("imie") &&
      params.includes("nazwisko") &&
      params.includes("email") &&
      params.includes("numerTelefonu")
    ) {
      return true;
    } else {
      return false;
    }
  }
}
