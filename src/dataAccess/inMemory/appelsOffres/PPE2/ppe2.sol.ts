import { AppelOffre } from '@entities'
import { makeParagrapheAchevementForDelai } from '../commonDataFields'

const solPPE2: AppelOffre = {
  id: 'PPE2 - Sol',
  type: 'sol',
  title:
    '2021 S 211-553136 portant sur la réalisation et l’exploitation d’Installations de production d’électricité à partir de l’énergie solaire « Centrales au sol »',
  shortTitle: 'PPE2 - Sol 2021 S 211-553136',
  launchDate: 'Août 2021',
  unitePuissance: 'MW',
  delaiRealisationEnMois: 30,
  contenuParagrapheAchevement: makeParagrapheAchevementForDelai(30, '7.1'),
  delaiRealisationTexte: 'trente (30) mois',
  decoupageParTechnologie: false,
  paragraphePrixReference: '7',
  paragrapheDelaiDerogatoire: '6.3',
  paragrapheAttestationConformite: '6.6',
  paragrapheEngagementIPFPGPFC: '3.2.7, 4.5 et 6.6.2',
  afficherParagrapheInstallationMiseEnServiceModification: true,
  renvoiModification: '5.2',
  affichageParagrapheECS: true,
  renvoiDemandeCompleteRaccordement: '6.1',
  renvoiRetraitDesignationGarantieFinancieres: '5.1',
  soumisAuxGarantiesFinancieres: true,
  garantiesFinancieresDeposeesALaCandidature: true,
  renvoiEngagementIPFPGPFC: '3.2.7',
  paragrapheClauseCompetitivite: '2.10',
  tarifOuPrimeRetenue: "le prix de référence T de l'électricité retenu",
  tarifOuPrimeRetenueAlt: 'ce prix de référence',
  afficherValeurEvaluationCarbone: true,
  afficherPhraseRegionImplantation: false,
  dossierSuiviPar: 'aopv.dgec@developpement-durable.gouv.fr',
  changementPuissance: {
    ratios: {
      min: 0.9,
      max: 1.1,
    },
  },
  periodes: [
    {
      id: '1',
      title: 'première',
      paragrapheAchevement: '6.3',
      certificateTemplate: 'ppe2.v1',
      noteThresholdBy: 'category',
      noteThreshold: {
        volumeReserve: {
          noteThreshold: 46.95,
          puissanceMax: 5,
        },
        autres: {
          noteThreshold: 54.9,
        },
      },
    },
  ],
  familles: [],
}

export { solPPE2 }
