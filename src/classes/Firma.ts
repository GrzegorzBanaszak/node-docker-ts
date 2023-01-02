export class Firma {
  //   idFirmy: number;
  nazwa: string;
  nip: string;
  numerTelefonu: string;
  static isCompany(item: any): item is Firma {
    if (item.nazwa && item.nip && item.numerTelefonu) {
      return true;
    } else {
      return false;
    }
  }
}
