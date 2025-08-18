import express from "express";
import countriesController from "../controllers/tournamanetsController";
import bodyValidation from "../middlewares/bodyValidation";
import { newCountrySchema, newTeamSchema, newTournamentSchema, newYearSchema } from "../validations/tournamentsValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isCountryAlreadyExists, isTeamAlreadyExists, isTournamentAlreadyExists, isYearAlreadyExists } from "../middlewares/tournamentsMiddlewares";

const trRoutes = express.Router();

trRoutes.post("/new-country", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newCountrySchema), isCountryAlreadyExists, countriesController.saveCountry);
trRoutes.get("/countries", countriesController.getAllCountries);

trRoutes.post("/new-team", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamSchema), isTeamAlreadyExists, countriesController.saveTeam);
trRoutes.get("/teams", countriesController.getAllTeams);


trRoutes.post("/new-year", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newYearSchema), isYearAlreadyExists, countriesController.saveYear);

trRoutes.post("/new-tr", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTournamentSchema), isTournamentAlreadyExists, countriesController.saveTournament);

export default trRoutes;