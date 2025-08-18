import express from "express";
import countriesController from "../controllers/tournamanetsController";
import bodyValidation from "../middlewares/bodyValidation";
import { newCountrySchema, newTeamSchema, newTournamentSchema, newTournamentSeasonSchema, newYearSchema } from "../validations/tournamentsValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isCountryAlreadyExists, isTeamAlreadyExists, isTournamentAlreadyExists, isTournamentSeasonAlreadyExists, isYearAlreadyExists } from "../middlewares/tournamentsMiddlewares";

const trRoutes = express.Router();

trRoutes.post("/new-country", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newCountrySchema), isCountryAlreadyExists, countriesController.saveCountry);
trRoutes.get("/countries", countriesController.getAllCountries);

trRoutes.post("/new-team", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamSchema), isTeamAlreadyExists, countriesController.saveTeam);
trRoutes.get("/teams", countriesController.getAllTeams);


trRoutes.post("/new-year", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newYearSchema), isYearAlreadyExists, countriesController.saveYear);
trRoutes.get("/years", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllYears);

trRoutes.post("/new-tr", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTournamentSchema), isTournamentAlreadyExists, countriesController.saveTournament);
trRoutes.get("/tr", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllTournaments);

trRoutes.post("/new-tr-season", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTournamentSeasonSchema), isTournamentSeasonAlreadyExists, countriesController.saveTournamentSeason);

export default trRoutes;