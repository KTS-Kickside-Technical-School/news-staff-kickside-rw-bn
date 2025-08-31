import express from "express";
import countriesController from "../controllers/tournamanetsController";
import bodyValidation from "../middlewares/bodyValidation";
import { newCountrySchema, newMatchSchema, newPlayerSchema, newTeamPlayerSchema, newTeamSchema, newTournamentSchema, newTournamentSeasonSchema, newYearSchema, updateMatchSchema } from "../validations/tournamentsValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isCountryAlreadyExists, isMatchAlreadyExists, isMatchExists, isMatchExistsBySlug, isPlayerArleadyInTheTeam, isPlayerExists, isSeasonExistBySlug, isTeamAlreadyExists, isTournamentAlreadyExists, isTournamentSeasonAlreadyExists, isTournamentSeasonExists, isYearAlreadyExists } from "../middlewares/tournamentsMiddlewares";
import tournamanetsController from "../controllers/tournamanetsController";

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
trRoutes.get("/tr-seasons", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllTournamentsSeasons);
trRoutes.get("/tr-season/:id", userAuthorization(["Admin", "Editor", "Journalist"]), isTournamentSeasonExists, countriesController.getSingleTournamentSeason);
trRoutes.get("/tr-latest-seasons", tournamanetsController.getLatestSeasons)
trRoutes.get('/:slug/matches', isSeasonExistBySlug, tournamanetsController.getTournamentSeasonMatches)

trRoutes.post("/new-match", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newMatchSchema), isMatchAlreadyExists, countriesController.saveMatch);
trRoutes.get("/matches", tournamanetsController.getAllMatches);
trRoutes.get('/hp-matches', tournamanetsController.getHomepageMatches);
trRoutes.get("/match-info/:id", userAuthorization(["Admin", "Editor", "Journalist"]), isMatchExists, tournamanetsController.getSingleMatch);
trRoutes.put("/match-update/:id", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(updateMatchSchema), isMatchExists, tournamanetsController.updateMatch);
trRoutes.post("/new-match-event", userAuthorization(["Admin", "Editor", "Journalist"]), isMatchExists, tournamanetsController.saveMatchEvent);
trRoutes.get("/full-match/:slug", isMatchExistsBySlug, tournamanetsController.getSingleMatch);

trRoutes.post("/new-player", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newPlayerSchema), tournamanetsController.savePlayer);
trRoutes.get("/players", userAuthorization(["Admin", "Editor", "Journalist"]), tournamanetsController.getAllPlayers);
trRoutes.get("/player-info/:id", userAuthorization(["Admin", "Editor", "Journalist"]), isPlayerExists, tournamanetsController.getSinglePlayer);

trRoutes.post("/new-team-player", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamPlayerSchema), isPlayerArleadyInTheTeam, tournamanetsController.saveTeamPlayer);

export default trRoutes;