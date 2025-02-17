import { When as Quand, DataTable } from '@cucumber/cucumber';
import { PotentielWorld } from '../../potentiel.world';
import { GestionnaireRéseau } from '@potentiel-domain/reseau';
import { mediator } from 'mediateur';
import { sleep } from '../../helpers/sleep';

Quand(
  'un administrateur ajoute un gestionnaire de réseau( avec le même code EIC)',
  async function (this: PotentielWorld, table: DataTable) {
    const exemple = table.rowsHash();

    try {
      const codeEIC = exemple['Code EIC'];
      const raisonSociale = exemple['Raison sociale'] ?? 'Une raison sociale';
      const aideSaisieRéférenceDossierRaccordement = {
        format: exemple['Format'],
        légende: exemple['Légende'],
        expressionReguliere: exemple['Expression régulière'],
      };

      await mediator.send<GestionnaireRéseau.GestionnaireRéseauUseCase>({
        type: 'Réseau.Gestionnaire.UseCase.AjouterGestionnaireRéseau',
        data: {
          identifiantGestionnaireRéseauValue: codeEIC,
          raisonSocialeValue: raisonSociale,
          aideSaisieRéférenceDossierRaccordementValue: {
            expressionReguliereValue: aideSaisieRéférenceDossierRaccordement.expressionReguliere,
            formatValue: aideSaisieRéférenceDossierRaccordement.format,
            légendeValue: aideSaisieRéférenceDossierRaccordement.légende,
          },
        },
      });

      this.gestionnaireRéseauWorld.gestionnairesRéseauFixtures.set(raisonSociale, {
        codeEIC,
        raisonSociale,
        aideSaisieRéférenceDossierRaccordement,
      });
      await sleep(100);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `un administrateur modifie les données d'un gestionnaire de réseau( inconnu)`,
  async function (this: PotentielWorld, table: DataTable) {
    const exemple = table.rowsHash();
    const raisonSociale = exemple['Raison sociale'];
    const codeEIC = exemple['Code EIC'] ?? raisonSociale.toUpperCase();
    const aideSaisieRéférenceDossierRaccordement = {
      format: exemple['Format'],
      légende: exemple['Légende'],
      expressionReguliere: exemple['Expression régulière'],
    };

    try {
      await mediator.send<GestionnaireRéseau.GestionnaireRéseauUseCase>({
        type: 'Réseau.Gestionnaire.UseCase.ModifierGestionnaireRéseau',
        data: {
          identifiantGestionnaireRéseauValue: codeEIC,
          raisonSocialeValue: raisonSociale,
          aideSaisieRéférenceDossierRaccordementValue: {
            expressionReguliereValue: aideSaisieRéférenceDossierRaccordement.expressionReguliere,
            formatValue: aideSaisieRéférenceDossierRaccordement.format,
            légendeValue: aideSaisieRéférenceDossierRaccordement.légende,
          },
        },
      });

      this.gestionnaireRéseauWorld.gestionnairesRéseauFixtures.set(raisonSociale, {
        codeEIC,
        raisonSociale,
        aideSaisieRéférenceDossierRaccordement,
      });
      await sleep(100);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `on valide la référence de dossier {string} pour le gestionnaire de réseau {string}`,
  async function (
    this: PotentielWorld,
    référenceÀValider: string,
    raisonSocialeGestionnaireRéseau: string,
  ) {
    const { codeEIC } = this.gestionnaireRéseauWorld.rechercherGestionnaireRéseauFixture(
      raisonSocialeGestionnaireRéseau,
    );

    const actualReadModel =
      await mediator.send<GestionnaireRéseau.ConsulterGestionnaireRéseauQuery>({
        data: {
          identifiantGestionnaireRéseau: codeEIC,
        },
        type: 'Réseau.Gestionnaire.Query.ConsulterGestionnaireRéseau',
      });

    const résultatValidation =
      actualReadModel.aideSaisieRéférenceDossierRaccordement.expressionReguliere.valider(
        référenceÀValider,
      );

    this.gestionnaireRéseauWorld.résultatsValidation.set(référenceÀValider, résultatValidation);
  },
);
