import { PrzyjecieZewnetrzneDto } from "./../classes/PrzyjecieZewnetrzne";

describe("Class validation testing", () => {
  it("Przyjecie zewnętrzne", () => {
    const isValid = PrzyjecieZewnetrzneDto.isValid({
      dostawca: 1,
      TowaryPrzyjecia: [{ idTowaru: 1, cena: 1.2, ilosc: 2 }],
    });

    expect(isValid).toBe(true);
  });
});
