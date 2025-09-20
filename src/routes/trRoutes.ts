import express from "express";
import countriesController from "../controllers/tournamanetsController";
import bodyValidation from "../middlewares/bodyValidation";
import { newCountrySchema, newMatchSchema, newPlayerSchema, newTeamPlayerSchema, newTeamSchema, newTournamentSchema, newTournamentSeasonSchema, newYearSchema, updateMatchSchema } from "../validations/tournamentsValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isCountryAlreadyExists, isMatchAlreadyExists, isMatchExists, isMatchExistsBySlug, isPlayerArleadyInTheTeam, isPlayerExists, isSeasonExistBySlug, isTeamAlreadyExists, isTournamentAlreadyExists, isTournamentSeasonAlreadyExists, isTournamentSeasonExists, isYearAlreadyExists } from "../middlewares/tournamentsMiddlewares";
import tournamanetsController from "../controllers/tournamanetsController";
import { isTeamExists } from "../middlewares/teamMiddleware";
import { newTeamPlayerInfoSchema } from "../validations/teamValidations";
import teamControllers from "../controllers/teamControllers";
import seasonsControllers from "../controllers/seasonsControllers";

const trRoutes = express.Router();

trRoutes.post("/new-country", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newCountrySchema), isCountryAlreadyExists, countriesController.saveCountry);
trRoutes.get("/countries", countriesController.getAllCountries);

trRoutes.post("/new-team", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamSchema), isTeamAlreadyExists, countriesController.saveTeam);
trRoutes.get("/teams", countriesController.getAllTeams);
trRoutes.get("/teams/single-team/:id", isTeamExists, teamControllers.getTeam);
trRoutes.get("/teams/get-team-players/:id", isTeamExists, teamControllers.getTeamPLayers);
trRoutes.post("/teams/save-new-team-player-info", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamPlayerInfoSchema), isTeamExists, teamControllers.saveNewTeamPlayerInfo);

trRoutes.post("/new-year", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newYearSchema), isYearAlreadyExists, countriesController.saveYear);
trRoutes.get("/years", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllYears);

trRoutes.post("/new-tr", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTournamentSchema), isTournamentAlreadyExists, countriesController.saveTournament);
trRoutes.get("/tr", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllTournaments);

trRoutes.post("/new-tr-season", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTournamentSeasonSchema), isTournamentSeasonAlreadyExists, countriesController.saveTournamentSeason);
trRoutes.get("/tr-seasons", userAuthorization(["Admin", "Editor", "Journalist"]), countriesController.getAllTournamentsSeasons);
trRoutes.get("/tr-season/:slug", userAuthorization(["Admin", "Editor", "Journalist"]), isTournamentSeasonExists, countriesController.getSingleTournamentSeason);
trRoutes.get("/tr-latest-seasons", tournamanetsController.getLatestSeasons)
trRoutes.put("/tr-season/set-featured-season/:slug", userAuthorization(["Admin", "Editor", "Journalist"]), isTournamentSeasonExists, seasonsControllers.setFeaturedSeason)
trRoutes.get("/tr-season/season/get-1-featured-season", seasonsControllers.getFeaturedSeason)

trRoutes.post("/new-match", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newMatchSchema), isMatchAlreadyExists, countriesController.saveMatch);
trRoutes.get("/matches", tournamanetsController.getAllMatches);
trRoutes.get('/hp-matches', tournamanetsController.getHomepageMatches);
trRoutes.get("/match-info/:id", userAuthorization(["Admin", "Editor", "Journalist"]), isMatchExists, tournamanetsController.getSingleMatch);
trRoutes.put("/match-update/:id", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(updateMatchSchema), isMatchExists, tournamanetsController.updateMatch);
trRoutes.post("/new-match-event", userAuthorization(["Admin", "Editor", "Journalist"]), isMatchExists, tournamanetsController.saveMatchEvent);
trRoutes.get("/full-match/:slug", isMatchExistsBySlug, tournamanetsController.getSingleMatch);
trRoutes.get('/:slug/matches', isSeasonExistBySlug, tournamanetsController.getTournamentSeasonMatches)

trRoutes.post("/new-player", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newPlayerSchema), tournamanetsController.savePlayer);
trRoutes.get("/players", userAuthorization(["Admin", "Editor", "Journalist"]), tournamanetsController.getAllPlayers);
trRoutes.get("/player-info/:id", userAuthorization(["Admin", "Editor", "Journalist"]), isPlayerExists, tournamanetsController.getSinglePlayer);

trRoutes.post("/new-team-player", userAuthorization(["Admin", "Editor", "Journalist"]), bodyValidation(newTeamPlayerSchema), isPlayerArleadyInTheTeam, tournamanetsController.saveTeamPlayer);

export default trRoutes;