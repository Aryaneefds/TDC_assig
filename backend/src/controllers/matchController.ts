import Match from "../models/match";
import Client from "../models/Client";
import { Request, Response } from "express";

type SendMatchBody = {
    clientId: string;
    matchedClientId: string;
    score: number;
    reason?: string;
};

export const  sendMatch= async (
        req: Request<{}, {}, SendMatchBody>,
        res: Response
) => {

    try {

        const {
            clientId,
            matchedClientId,
            score,
            reason
        } = req.body;

        const client =
            await Client.findById(
                clientId
            );

        const candidate =
            await Client.findById(
                matchedClientId
            );

            const existingMatch = await Match.findOne({
    clientId,
    matchedClientId
});

if(existingMatch){
    return res.status(400).json({
        success:false,
        message:"Match already sent"
    });
}

        if(
            !client ||
            !candidate
        ){
            return res.status(404)
            .json({
                message:"Client not found"
            });
        }

        const match =
            await Match.create({
                clientId,
                matchedClientId,
                score,
                // ensure reason is null instead of undefined to satisfy exactOptionalPropertyTypes
                reason: reason ?? null,
                status: "Sent"
            });

        res.status(200).json({

            success:true,

            message:
              "Match sent successfully",

            match,

            candidate:{
                firstName:
                    candidate.firstName,

                lastName:
                    candidate.lastName,

                city:
                    candidate.city,

                profession:
                    candidate.designation,

                religion:
                    candidate.religion
            }
        });

    } catch(error){

        res.status(500).json({
            message:
            "Failed to send match"
        });
    }
};

export const getAllMatches = async (
  req: Request,
        res: Response
) => {

    const matches =
      await Match.find()
      .populate(
        "clientId",
        "firstName lastName"
      )
      .populate(
        "matchedClientId",
        "firstName lastName"
      );

    res.json(matches);
};