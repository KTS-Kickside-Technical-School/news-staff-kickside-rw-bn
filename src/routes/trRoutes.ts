import express from "express";
import countriesController from "../controllers/tournamanetsController";
import bodyValidation from "../middlewares/bodyValidation";
import { newCountrySchema, newTeamSchema } from "../validations/tournamentsValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isCountryAlreadyExists, isTeamAlreadyExists } from "../middlewares/tournamentsMiddlewares";

const trRoutes = express.Router();

trRoutes.post("/new-country", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newCountrySchema), isCountryAlreadyExists, countriesController.saveCountry);
trRoutes.get("/countries", countriesController.getAllCountries);

trRoutes.post("/new-team", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamSchema), isTeamAlreadyExists, countriesController.saveTeam);
trRoutes.get("/teams", countriesController.getAllTeams);

export default trRoutes;