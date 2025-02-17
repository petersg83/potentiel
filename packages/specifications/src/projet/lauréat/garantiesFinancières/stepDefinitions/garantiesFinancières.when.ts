import { DataTable, When as Quand } from '@cucumber/cucumber';
import { mediator } from 'mediateur';
import { PotentielWorld } from '../../../../potentiel.world';
import { sleep } from '../../../../helpers/sleep';
import { GarantiesFinancières } from '@potentiel-domain/laureat';
import { convertStringToReadableStream } from '../../../../helpers/convertStringToReadable';

Quand(
  'le porteur soumet des garanties financières pour le projet {string} avec :',
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();

    try {
      const typeGarantiesFinancières = exemple['type'] || 'consignation';
      const dateÉchéance = exemple[`date d'échéance`] || undefined;
      const format = exemple['format'] || 'application/pdf';
      const dateConstitution = exemple[`date de constitution`] || '2024-01-01';
      const contenuFichier = exemple['contenu fichier'] || 'contenu fichier';
      const dateSoumission = exemple['date de soumission'] || '2024-01-02';
      const soumisPar = exemple['soumis par'] || 'user@test.test';

      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.SoumettreGarantiesFinancièresUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.SoumettreDépôtGarantiesFinancières',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          typeValue: typeGarantiesFinancières,
          dateConstitutionValue: new Date(dateConstitution).toISOString(),
          soumisLeValue: new Date(dateSoumission).toISOString(),
          soumisParValue: soumisPar,
          attestationValue: { content: convertStringToReadableStream(contenuFichier), format },
          ...(dateÉchéance && { dateÉchéanceValue: new Date(dateÉchéance).toISOString() }),
        },
      });
      await sleep(500);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  'le porteur supprime les garanties financières à traiter pour le projet {string}',
  async function (this: PotentielWorld, nomProjet: string) {
    try {
      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.SupprimerGarantiesFinancièresÀTraiterUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.SupprimerGarantiesFinancièresÀTraiter',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          suppriméLeValue: new Date().toISOString(),
          suppriméParValue: 'porteur@test.test',
        },
      });
      await sleep(500);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `l'utilisateur dreal valide les garanties financières à traiter pour le projet {string} avec :`,
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();
    const dateValidation = exemple['date de validation'];
    try {
      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.ValiderGarantiesFinancièresUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.ValiderDépôtGarantiesFinancièresEnCours',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          validéLeValue: new Date(dateValidation).toISOString(),
          validéParValue: 'dreal@test.test',
        },
      });
      await sleep(500);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  'le porteur modifie les garanties financières à traiter pour le projet {string} avec :',
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();

    try {
      const typeGarantiesFinancières = exemple['type'] || 'consignation';
      const dateÉchéance = exemple[`date d'échéance`] || undefined;
      const format = exemple['format'] || 'application/pdf';
      const dateConstitution = exemple[`date de constitution`] || '2024-01-01';
      const contenuFichier = exemple['contenu fichier'] || 'contenu fichier';
      const dateSoumission = exemple['date de soumission'] || '2024-01-02';
      const soumisPar = exemple['soumis par'] || 'user@test.test';

      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.ModifierDépôtGarantiesFinancièresEnCoursUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.ModifierDépôtGarantiesFinancièresEnCours',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          typeValue: typeGarantiesFinancières,
          dateConstitutionValue: new Date(dateConstitution).toISOString(),
          modifiéLeValue: new Date(dateSoumission).toISOString(),
          modifiéParValue: soumisPar,
          attestationValue: { content: convertStringToReadableStream(contenuFichier), format },
          ...(dateÉchéance && { dateÉchéanceValue: new Date(dateÉchéance).toISOString() }),
        },
      });
      await sleep(500);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `l'admin importe le type des garanties financières pour le projet {string} avec :`,
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();

    try {
      const typeGarantiesFinancières = exemple['type'] || 'consignation';
      const dateÉchéance = exemple[`date d'échéance`] || undefined;
      const importéLe = exemple[`date d'import `] || '2024-01-01';

      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.ImporterTypeGarantiesFinancièresUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.ImporterTypeGarantiesFinancières',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          typeValue: typeGarantiesFinancières,
          importéLeValue: new Date(importéLe).toISOString(),
          importéParValue: 'admin@test.test',
          ...(dateÉchéance && { dateÉchéanceValue: new Date(dateÉchéance).toISOString() }),
        },
      });
      await sleep(500);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `un admin modifie les garanties financières validées pour le projet {string} avec :`,
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();

    try {
      const typeGarantiesFinancières = exemple['type'] || 'consignation';
      const dateÉchéance = exemple[`date d'échéance`] || undefined;
      const format = exemple['format'] || 'application/pdf';
      const dateConstitution = exemple[`date de constitution`] || '2024-01-01';
      const contenuFichier = exemple['contenu fichier'] || 'contenu fichier';
      const modifiéLe = exemple['date mise à jour'] || '2024-01-01';

      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.ModifierGarantiesFinancièresUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.ModifierGarantiesFinancières',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          typeValue: typeGarantiesFinancières,
          ...(dateÉchéance && { dateÉchéanceValue: new Date(dateÉchéance).toISOString() }),
          attestationValue: { content: convertStringToReadableStream(contenuFichier), format },
          dateConstitutionValue: new Date(dateConstitution).toISOString(),
          modifiéLeValue: new Date(modifiéLe).toISOString(),
          modifiéParValue: 'admin@test.test',
        },
      });
      await sleep(300);
    } catch (error) {
      this.error = error as Error;
    }
  },
);

Quand(
  `un porteur enregistre l'attestation des garanties financières validées pour le projet {string} avec :`,
  async function (this: PotentielWorld, nomProjet: string, dataTable: DataTable) {
    const exemple = dataTable.rowsHash();

    try {
      const format = exemple['format'] || 'application/pdf';
      const dateConstitution = exemple[`date de constitution`] || '2024-01-01';
      const contenuFichier = exemple['contenu fichier'] || 'contenu fichier';
      const enregistréLe = exemple['date mise à jour'] || '2024-01-01';

      const { identifiantProjet } = this.lauréatWorld.rechercherLauréatFixture(nomProjet);

      await mediator.send<GarantiesFinancières.EnregistrerAttestationGarantiesFinancièresUseCase>({
        type: 'Lauréat.GarantiesFinancières.UseCase.EnregistrerAttestation',
        data: {
          identifiantProjetValue: identifiantProjet.formatter(),
          attestationValue: { content: convertStringToReadableStream(contenuFichier), format },
          dateConstitutionValue: new Date(dateConstitution).toISOString(),
          enregistréLeValue: new Date(enregistréLe).toISOString(),
          enregistréParValue: 'porteur@test.test',
        },
      });
      await sleep(300);
    } catch (error) {
      this.error = error as Error;
    }
  },
);
