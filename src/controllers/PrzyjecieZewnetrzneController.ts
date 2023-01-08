import { PrzyjecieZewnetrzne } from "./../classes/PrzyjecieZewnetrzne";
import { Request, Response } from "express";
import { Controller } from "./Controller";
import { PrzyjecieZewnetrzneDto } from "../classes/PrzyjecieZewnetrzne";
import moment from "moment";
// import "moment/locale/pl";

export class PrzyjecieZewnetrzneController extends Controller {
  // @desc   - Get all goods received notes
  // @route  - Get /good-received-note/
  // @access - Public
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const receivedNotes = await this.client.przyjecieZewnetrzne.findMany({
        select: {
          idPrzyjecia: true,
          numerPrzyjecia: true,
          dataPrzyjecia: true,
        },
      });

      res.status(200).json(receivedNotes);
    };
  }
  // @desc   - Get a goods received note by idPrzyjecia
  // @route  - Get /good-received-note/5
  // @access - Public
  get(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const parsedId: number = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      const receivedNote = await this.client.przyjecieZewnetrzne.findUnique({
        where: {
          idPrzyjecia: parsedId,
        },
        select: {
          idPrzyjecia: true,
          numerPrzyjecia: true,
          dostawca: true,
          TowaryPrzyjecia: {
            select: {
              towar: {
                select: {
                  nazwa: true,
                  opis: true,
                },
              },
              cena: true,
              ilosc: true,
            },
          },
        },
      });

      if (!receivedNote) {
        res.status(401);
        throw new Error("Goods received note not find");
      }

      res.status(200).json(receivedNote);
    };
  }

  // @desc   - Create a new goods received note
  // @route  - Post /good-received-note/add
  // @access - Public
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data: unknown = req.body;

      if (!PrzyjecieZewnetrzneDto.isValid(data)) {
        res.status(404);
        throw new Error("Data is not valid");
      }

      //Get all received note from a current year
      const firstOf = moment().startOf("year").format("YYYY-MM-DD");
      const lastOf = moment().endOf("year").format("YYYY-MM-DD");

      const PZ = await this.client.przyjecieZewnetrzne.findMany({
        where: {
          dataPrzyjecia: {
            lte: new Date(lastOf),
            gte: new Date(firstOf),
          },
        },
      });

      const receivedNote = new PrzyjecieZewnetrzne(PZ.length, data.idDostawcy);

      data.TowaryPrzyjecia.forEach((item) => {
        item.numerPrzyjecia = receivedNote.numerPrzyjecia;
      });

      //Create a new goods recived note with every goods by transaction
      const [note, noteItems] = await this.client.$transaction([
        this.client.przyjecieZewnetrzne.create({
          data: receivedNote,
        }),
        this.client.towaryPrzyjecia.createMany({
          data: data.TowaryPrzyjecia,
        }),
      ]);

      if (!note) {
        res.status(401);
        throw new Error("Can't create a new goods received note");
      }

      res.status(200).json(note);
    };
  }

  // @desc   - Update exist goods received note
  // @route  - Put /good-received-note/5
  // @access - Public
  update(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const parsedId: number = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      const receivedNote = await this.client.przyjecieZewnetrzne.findUnique({
        where: { idPrzyjecia: parsedId },
      });

      if (!receivedNote) {
        res.status(403);
        throw new Error("There isn't any goods receved note on this id");
      }

      const data: unknown = req.body;

      if (!PrzyjecieZewnetrzneDto.isValid(data)) {
        res.status(404);
        throw new Error("Data is not valid");
      }

      data.TowaryPrzyjecia.forEach((item) => {
        item.numerPrzyjecia = receivedNote.numerPrzyjecia;
      });

      await this.client.$transaction(async (tc) => {
        await tc.towaryPrzyjecia.deleteMany({
          where: {
            numerPrzyjecia: receivedNote.numerPrzyjecia,
          },
        });

        await tc.towaryPrzyjecia.createMany({
          data: data.TowaryPrzyjecia,
        });

        const updatedNote = await tc.przyjecieZewnetrzne.update({
          where: {
            idPrzyjecia: parsedId,
          },
          data: {
            idDostawcy: data.idDostawcy,
          },
        });

        return null;
      });

      const updatedNote = await this.client.przyjecieZewnetrzne.findUnique({
        where: { idPrzyjecia: parsedId },
        select: {
          idPrzyjecia: true,
          numerPrzyjecia: true,
          dostawca: true,
          TowaryPrzyjecia: {
            select: {
              towar: {
                select: {
                  nazwa: true,
                  opis: true,
                },
              },
              cena: true,
              ilosc: true,
            },
          },
        },
      });

      res.status(201).json(updatedNote);
    };
  }

  // @desc   - Delete goods received note
  // @route  - Delete /good-received-note/5
  // @access - Public
  delete(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const parsedId: number = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      const receivedNote = await this.client.przyjecieZewnetrzne.findUnique({
        where: { idPrzyjecia: parsedId },
      });

      if (!receivedNote) {
        res.status(403);
        throw new Error("There isn't any goods receved note on this id");
      }

      const { deletedNote } = await this.client.$transaction(async (tc) => {
        await tc.towaryPrzyjecia.deleteMany({
          where: {
            numerPrzyjecia: receivedNote.numerPrzyjecia,
          },
        });

        const deletedNote = await tc.przyjecieZewnetrzne.delete({
          where: {
            idPrzyjecia: parsedId,
          },
        });
        return { deletedNote };
      });

      res.status(200).json(deletedNote);
    };
  }
}
