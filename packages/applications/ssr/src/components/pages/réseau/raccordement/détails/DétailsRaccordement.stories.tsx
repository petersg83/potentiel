import type { Meta, StoryObj } from '@storybook/react';

import { DétailsRaccordementPage, DétailsRaccordementPageProps } from './DétailsRaccordement.page';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pages/Réseau/Raccordement/Détails',
  component: DétailsRaccordementPage,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<DétailsRaccordementPageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projet: {
      identifiantProjet: 'identifiantProjet#1',
      appelOffre: 'Appel offre',
      période: 'Période',
      famille: 'Famille',
      nom: 'Nom du projet',
      dateDésignation: '2021-10-23',
      localité: {
        codePostal: 'XXXXX',
        commune: 'Commune',
        département: 'Département',
        région: 'Région',
      },
      statut: 'classé',
    },
    gestionnaireRéseau: {
      aideSaisieRéférenceDossierRaccordement: {
        expressionReguliere: 'expresion-régulière',
        format: 'Format',
        légende: 'Légende',
      },
      raisonSociale: 'Raison sociale',
      identifiantGestionnaireRéseau: 'identifiantGestionnaireRéseau#1',
      canEdit: true,
    },
    dossiers: [
      {
        identifiantProjet: 'identifiantProjet#1',
        référence: 'référence-dossier#1',
        demandeComplèteRaccordement: {
          canEdit: true,
          accuséRéception: 'accusé-reception#1',
          dateQualification: '2022-05-10',
        },
        propositionTechniqueEtFinancière: {
          canEdit: true,
          dateSignature: '2022-09-30',
          propositionTechniqueEtFinancièreSignée: 'propositionTechniqueEtFinancièreSignée#1',
        },
        miseEnService: {
          canEdit: true,
          dateMiseEnService: '2023-12-25',
        },
      },
    ],
  },
};
