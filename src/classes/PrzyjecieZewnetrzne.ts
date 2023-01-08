import moment from "moment";
export class PrzyjecieZewnetrzneDto {
  idDostawcy: number;
  TowaryPrzyjecia: Array<TowaryPrzyjecia>;
  static isValid(data: any): data is PrzyjecieZewnetrzneDto {
    let isCommoditesValid: boolean = true;

    if (!data.TowaryPrzyjecia || data.TowaryPrzyjecia.length === 0) {
      return false;
    }

    data.TowaryPrzyjecia.every((element) => {
      if (!element.idTowaru || !element.cena || !element.ilosc) {
        isCommoditesValid = false;
        return false;
      }

      return true;
    });

    if (data.idDostawcy && isCommoditesValid) {
      return true;
    } else {
      return false;
    }
  }
}

export class PrzyjecieZewnetrzne {
  numerPrzyjecia: string;
  idDostawcy: number;

  constructor(length: number, dostawca: number) {
    this.numerPrzyjecia = this.generateReceivedNoteNumber(length);
    this.idDostawcy = dostawca;
  }

  private generateReceivedNoteNumber(length: number): string {
    const dateNow = moment();
    return `${length + 1}/${dateNow.month() + 1}/${dateNow.year()}`;
  }
}

export class TowaryPrzyjecia {
  idTowaru: number;
  cena: number;
  ilosc: number;
  numerPrzyjecia: string;
}
