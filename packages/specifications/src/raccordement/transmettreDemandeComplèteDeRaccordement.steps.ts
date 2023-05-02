import { Given as EtantDonné, When as Quand, Then as Alors, DataTable } from '@cucumber/cucumber';
import { loadAggregate, publish } from '@potentiel/pg-event-sourcing';
import {
  DossierRaccordementReadModel,
  GestionnaireNonRéférencéError,
  PlusieursGestionnairesRéseauPourUnProjetError,
  consulterDossierRaccordementQueryHandlerFactory,
  consulterGestionnaireRéseauQueryHandlerFactory,
  consulterProjetQueryHandlerFactory,
  listerDossiersRaccordementQueryHandlerFactory,
  transmettreDemandeComplèteRaccordementCommandHandlerFactory,
  transmettreDemandeComplèteRaccordementUseCaseFactory,
} from '@potentiel/domain';
import { findProjection } from '@potentiel/pg-projections';
import { PotentielWorld } from '../potentiel.world';

EtantDonné(
  "un projet avec une demande complète de raccordement transmise auprès d'un gestionnaire de réseau avec :",
  async function (this: PotentielWorld, table: DataTable) {
    const exemple = table.rowsHash();
    const dateQualification = new Date(exemple['La date de qualification']);
    const référenceDemandeRaccordement = exemple['La référence du dossier de raccordement'];

    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    await transmettreDemandeComplèteRaccordementUseCase({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
      identifiantGestionnaireRéseau: {
        codeEIC: this.gestionnaireRéseauWorld.enedis.codeEIC,
      },
      dateQualification,
      référenceDossierRaccordement: référenceDemandeRaccordement,
    });
  },
);

Quand(
  `le porteur du projet transmet une autre demande complète de raccordement auprès du même gestionnaire de réseau avec :`,
  async function (this: PotentielWorld, table: DataTable) {
    const exemple = table.rowsHash();
    this.raccordementWorld.dateQualification = new Date(exemple['La date de qualification']);
    this.raccordementWorld.référenceDossierRaccordement =
      exemple['La référence du dossier de raccordement'];

    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    await transmettreDemandeComplèteRaccordementUseCase({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
      identifiantGestionnaireRéseau: {
        codeEIC: this.gestionnaireRéseauWorld.enedis.codeEIC,
      },
      dateQualification: this.raccordementWorld.dateQualification,
      référenceDossierRaccordement: this.raccordementWorld.référenceDossierRaccordement,
    });
  },
);

Quand(
  `le porteur d'un projet transmet une demande complète de raccordement auprès d'un gestionnaire de réseau avec :`,
  async function (this: PotentielWorld, table: DataTable) {
    const exemple = table.rowsHash();
    this.raccordementWorld.dateQualification = new Date(exemple['La date de qualification']);
    this.raccordementWorld.référenceDossierRaccordement =
      exemple['La référence du dossier de raccordement'];

    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    await transmettreDemandeComplèteRaccordementUseCase({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
      identifiantGestionnaireRéseau: {
        codeEIC: this.gestionnaireRéseauWorld.enedis.codeEIC,
      },
      dateQualification: this.raccordementWorld.dateQualification,
      référenceDossierRaccordement: this.raccordementWorld.référenceDossierRaccordement,
    });
  },
);

Quand(
  `le porteur du projet transmet une demande complète de raccordement auprès d'un gestionnaire de réseau non référencé`,
  async function (this: PotentielWorld) {
    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    try {
      await transmettreDemandeComplèteRaccordementUseCase({
        identifiantProjet: this.raccordementWorld.identifiantProjet,
        identifiantGestionnaireRéseau: {
          codeEIC: 'gestionnaire-de-réseau-inconnu',
        },
        dateQualification: new Date(),
        référenceDossierRaccordement: 'une référence',
      });
    } catch (e) {
      if (e instanceof GestionnaireNonRéférencéError) {
        this.error = e;
      }
    }
  },
);

Alors(
  'le projet devrait avoir {int} dossiers de raccordement pour ce gestionnaire de réseau',
  async function (this: PotentielWorld, nombreDeDemandes: number) {
    const listerDemandeComplèteRaccordement = listerDossiersRaccordementQueryHandlerFactory({
      find: findProjection,
    });

    const actual = await listerDemandeComplèteRaccordement({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
    });

    actual.références.should.length(nombreDeDemandes);
  },
);

Alors(
  'le projet devrait avoir un dossier de raccordement pour ce gestionnaire de réseau',
  async function async(this: PotentielWorld) {
    const consulterDossierRaccordement = consulterDossierRaccordementQueryHandlerFactory({
      find: findProjection,
    });

    const actual = await consulterDossierRaccordement({
      référence: this.raccordementWorld.référenceDossierRaccordement,
      identifiantProjet: this.raccordementWorld.identifiantProjet,
    });

    const expected: DossierRaccordementReadModel = {
      type: 'dossier-raccordement',
      référence: this.raccordementWorld.référenceDossierRaccordement,
      dateQualification: this.raccordementWorld.dateQualification.toISOString(),
    };

    actual.should.be.deep.equal(expected);

    const consulterProjet = consulterProjetQueryHandlerFactory({ find: findProjection });

    const {
      identifiantGestionnaire = {
        codeEIC: '',
      },
    } = await consulterProjet({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
    });

    identifiantGestionnaire.should.be.deep.equal({
      codeEIC: this.gestionnaireRéseauWorld.enedis.codeEIC,
    });
  },
);

Alors(
  'le dossier est consultable dans la liste des dossiers de raccordement du projet',
  async function async(this: PotentielWorld) {
    const listerDossiersRaccordement = listerDossiersRaccordementQueryHandlerFactory({
      find: findProjection,
    });

    const actual = await listerDossiersRaccordement({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
    });
    actual.références.should.contain(this.raccordementWorld.référenceDossierRaccordement);
  },
);

EtantDonné(
  `un projet avec une demande complète de raccordement transmise auprès d'un gestionnaire de réseau`,
  async function (this: PotentielWorld) {
    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    await transmettreDemandeComplèteRaccordementUseCase({
      identifiantProjet: this.raccordementWorld.identifiantProjet,
      identifiantGestionnaireRéseau: {
        codeEIC: this.gestionnaireRéseauWorld.enedis.codeEIC,
      },
      dateQualification: new Date('2022-12-31'),
      référenceDossierRaccordement: 'UNE-REFERENCE-DCR',
    });
  },
);

Quand(
  `le porteur du projet transmet une demande complète de raccordement auprès d'un autre gestionnaire de réseau`,
  async function (this: PotentielWorld) {
    const codeEICAutreGDR = 'UN-AUTRE-GDR';
    await this.gestionnaireRéseauWorld.createGestionnaireRéseau(
      codeEICAutreGDR,
      'Un autre gestionnaire',
    );

    const transmettreDemandeComplèteRaccordementUseCase = getUseCase();

    try {
      await transmettreDemandeComplèteRaccordementUseCase({
        identifiantProjet: this.raccordementWorld.identifiantProjet,
        identifiantGestionnaireRéseau: {
          codeEIC: codeEICAutreGDR,
        },
        dateQualification: new Date('2022-11-24'),
        référenceDossierRaccordement: 'Enieme-DCR',
      });
    } catch (error) {
      if (error instanceof PlusieursGestionnairesRéseauPourUnProjetError) {
        this.error = error;
      }
    }
  },
);

function getUseCase() {
  const consulterGestionnaireRéseauQuery = consulterGestionnaireRéseauQueryHandlerFactory({
    find: findProjection,
  });

  const transmettreDemandeComplèteRaccordementCommand =
    transmettreDemandeComplèteRaccordementCommandHandlerFactory({
      loadAggregate,
      publish,
    });

  const transmettreDemandeComplèteRaccordementUseCase =
    transmettreDemandeComplèteRaccordementUseCaseFactory({
      consulterGestionnaireRéseauQuery,
      transmettreDemandeComplèteRaccordementCommand,
    });
  return transmettreDemandeComplèteRaccordementUseCase;
}
