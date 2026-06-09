import Client from "../models/Client";
import { Request, Response } from "express";
import {findMatches} from "../services/matchingService";
import { rerankTopMatches }from "../services/aiRankingService";


export const getAllClients = async (  req: Request,  res: Response) => {
  try {
    const clients = await Client.find();

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch clients",
    });
  }
};

export const getClientById = async (  req: Request,  res: Response) => {
  try {
    const client = await Client.findById(
      req.params.id
    );
      console.log(req.params.id)

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch client",
    });
  }
};

export const createClient = async (req: Request,res: Response) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error,
    });
  }
};


export const addNote = async (req: Request,res: Response) => {
  try {
    const { note } = req.body;

    const client = await Client.findById(
      req.params.id
    );

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    client.notes.push(note);

    await client.save();

    res.status(200).json({
      success: true,
      notes: client.notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add note",
    });
  }
};


export const updateStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { statusTag } = req.body;

    const client =
      await Client.findByIdAndUpdate(
        req.params.id,
        { statusTag },
        { new: true }
      );

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};



export const getMatches = async( req: Request, res : Response) => {
  try{

        const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const matches = await findMatches(id);


    res.json(matches);
  }
  catch (error){

    res.status(500).json({
      message:"failed to fetch matches"
    });
  }
};

export const getAiMatches =
async (
  req:Request,
  res:Response
) => {

  try {

    const client =
      await Client.findById(
        req.params.id
      );

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

       const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const matches =
      await findMatches(
        id
      );

    const top10 =
      matches.slice(0, 10);

    const top3 =
      await rerankTopMatches(
        client,
        top10
      );

    const finalMatches =
      top3.map((aiMatch: any) => {

        const original =
          top10.find(
            match =>
              match.candidate._id.toString()
              ===
              aiMatch.candidateId
          );

        return {
          rank: aiMatch.rank,

          label: aiMatch.label,

          reason: aiMatch.reason,

          score:
            original?.score,

          candidate:
            original?.candidate
        };
      });

    res.status(200).json({
      clientId:
        client._id,

      matches:
        finalMatches
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to generate AI matches"
    });
  }
};