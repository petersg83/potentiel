import { AppelOffre } from '@entities';

const garantieFinanciereEnMois = 36;

export const zni2017: AppelOffre = {
  id: 'CRE4 - ZNI 2017',
  type: 'zni',
  title:
    'portant sur la réalisation et l’exploitation d’installations de production d’électricité à partir de techniques de conversion du rayonnement solaire d’une puissance supérieure à 100 kWc et situées dans les zones non interconnectées',
  shortTitle: 'CRE4 - ZNI 2017',
  launchDate: 'mai 2015',
  unitePuissance: 'MWc',
  delaiRealisationEnMois: 36,
  autoritéCompétenteDemandesDélai: 'dreal',
  decoupageParTechnologie: false,
  delaiRealisationTexte: 'trente-six (36) mois',
  paragraphePrixReference: '4.4',
  paragrapheDelaiDerogatoire: '6.4',
  paragrapheAttestationConformite: '6.6',
  paragrapheEngagementIPFPGPFC: '',
  afficherParagrapheInstallationMiseEnServiceModification: true,
  renvoiModification: '5.3',
  affichageParagrapheECS: true,
  renvoiDemandeCompleteRaccordement: '6.1',
  renvoiRetraitDesignationGarantieFinancieres: '7.1',
  renvoiEngagementIPFPGPFC: '',
  paragrapheClauseCompetitivite: '',
  tarifOuPrimeRetenue: "le prix de référence T de l'électricité retenu",
  tarifOuPrimeRetenueAlt: 'ce prix de référence',
  afficherValeurEvaluationCarbone: true,
  afficherPhraseRegionImplantation: false,
  dossierSuiviPar: 'aopv.dgec@developpement-durable.gouv.fr',
  renvoiSoumisAuxGarantiesFinancieres: `doit être au minimum de ${garantieFinanciereEnMois} mois`,
  changementPuissance: {
    ratios: {
      min: 0.9,
      max: 1.1,
    },
  },
  choisirNouveauCahierDesCharges: true,
  donnéesCourriersRéponse: {
    texteEngagementRéalisationEtModalitésAbandon: {
      référenceParagraphe: '6.3',
      dispositions: `Le Candidat dont l’offre a été retenue met en service l’Installation dans les conditions du présent cahier des charges, et réalise l’Installation conformément aux éléments du dossier de candidature (les possibilités et modalités de modification sont indiquées au 5.4). 
Par exception, le Candidat est délié de cette obligation : 
- en cas de retrait de l’autorisation d’urbanisme par l’autorité compétente ou d’annulation de cette autorisation à la suite d’un contentieux. Les retraits gracieux sur demande du candidat ne sont pas concernés. 
-  en  cas  de  non  obtention  ou  de  retrait  de  toute  autre  autorisation  administrative  ou  dérogation nécessaire à la réalisation du projet. 
Il en informe dans ce cas le Préfet en joignant les pièces justificatives. La garantie financière est alors levée. 
Le Candidat peut également être délié de cette obligation selon appréciation du ministre chargé de l’énergie  suite  à  une  demande  dûment  justifiée.  Le  Ministre  peut  accompagner  son accord  de conditions. L’accord du Ministre et les conditions imposées le cas échéant, ne limitent pas la possibilité de recours de l’Etat aux sanctions du 8.2.`,
    },
    texteChangementDePuissance: {
      référenceParagraphe: '5.4.4',
      dispositions: `Les modifications de la Puissance installée avant l’Achèvement sont autorisées, sous réserve que la Puissance de l’Installation modifiée soit comprise entre quatre-vingt-quinze pourcents et cent pourcents de la Puissance formulée dans l’offre. Elles doivent faire l’objet d’une information au Préfet. Les modifications de la Puissance installée hors de cette fourchette ne sont pas autorisées.`,
    },
    texteChangementDActionnariat: {
      référenceParagraphe: '5.3.2',
      dispositions: `Les modifications de la structure du capital du Candidat avant constitution des garanties financières prévues au 6.2 ne sont pas autorisées. 
Les modifications de la structure du capital du Candidat après constitution des garanties financières prévues au 6.2 sont réputées autorisées. Elles doivent faire l’objet d’une information au Préfet dans un délai d’un (1) mois. A cette fin, le producteur transmet à la DREAL les copies des statuts de la société et le(s) justificatif(s) relatif à la composition de l’actionnariat. 
Si le candidat a joint à son offre la lettre d’engagement du 3.2.6, il est de sa responsabilité de s’assurer du respect de son engagement.`,
    },
    texteIdentitéDuProducteur: {
      référenceParagraphe: '2.5',
      dispositions: `Le Candidat doit être le Producteur de l’Installation de production. Il ne peut pas indiquer dans son offre qu’une autre société sera le Producteur de l’Installation de production au cas où le projet serait retenu.`,
    },
    texteChangementDeProducteur: {
      référenceParagraphe: '5.3.1',
      dispositions: `Les changements de Producteur avant constitution des garanties financières prévues au 6.2 ne sont pas autorisés. 
Les changements de Producteur après constitution des garanties financières prévues au 6.2 sont réputés autorisés.
Ils doivent faire l’objet d’une information au Préfet dans un délai d’un mois. A cette fin, le producteur transmet à la DREAL de la région concernée par le projet, les statuts de la nouvelle société ainsi que les nouvelles garanties financières prévues au 6.2.`,
    },
    texteDélaisDAchèvement: {
      référenceParagraphe: '6.4',
      dispositions: `Le Candidat dont l’offre a été retenue s’engage à ce que l’Achèvement de son Installation intervienne avant une limite définie par la date la plus tardive des deux dates suivantes :
- {{délai de réalisation}} mois à compter de la Date de désignation.
- deux mois à compter de la fin des travaux de raccordement, sous réserve que le Producteur ait mis en oeuvre toutes les démarches dans le respect des exigences du gestionnaire de réseau pour que les travaux de raccordement soient réalisés dans les délais. Dans ce cas, l’attestation de conformité doit être transmise au Cocontractant dans un délai de 2 mois à compter de la fin des travaux de raccordement (date déclarée par le gestionnaire de réseau).
En cas de dépassement de ce délai, la durée de contrat de rémunération mentionnée au 6.4 est amputée d’un raccourcissement R égal à la durée T de dépassement : R = T.
Des dérogations au délai d’Achèvement sont toutefois possibles dans le cas où des contentieux administratifs effectués à l’encontre de toute autorisation administrative nécessaire à la réalisation du projet ont pour effet de retarder l’achèvement de l’installation. Dans ce cas, un délai supplémentaire égal à la durée entre la date du recours initial et la date de la décision définitive attestée par la décision ayant autorité de la chose jugée est alors accordé dans le cadre de contentieux.
Ces retards sont réputés autorisés sous réserve de pouvoir les justifier auprès de l’acheteur obligé.
Des délais supplémentaires, laissés à l’appréciation du Préfet, peuvent être accordés en cas d’événement imprévisible à la Date de désignation et extérieur au Producteur, dûment justifié.
`,
    },
  },
  periodes: [
    {
      id: '1',
      title: 'première',
      type: 'legacy',
      cahierDesCharges: {
        référence: '2016/S 242-441980',
        url: 'https://www.cre.fr/media/fichiers/publications/appelsoffres/telecharger-le-cahier-des-charges-pv-stockage-zni',
      },
      delaiDcrEnMois: { valeur: 2, texte: 'deux' },
    },
  ],
  familles: [
    {
      id: '1',
      title: '1. 100kWc - 250kWc',
      soumisAuxGarantiesFinancieres: 'après candidature',
      garantieFinanciereEnMois,
    },
    {
      id: '2',
      title: '2. 250kWc - 1,5MWc',
      soumisAuxGarantiesFinancieres: 'après candidature',
      garantieFinanciereEnMois,
    },
    {
      id: '3',
      title: '3. 250kWc - 5MWc',
      soumisAuxGarantiesFinancieres: 'après candidature',
      garantieFinanciereEnMois,
    },
  ],
  cahiersDesChargesModifiésDisponibles: [
    {
      type: 'modifié',
      paruLe: '30/07/2021',
      url: 'https://www.cre.fr/media/Fichiers/publications/appelsoffres/30072021-avis-modificatif-cre4-zni-1',
      donnéesCourriersRéponse: {
        texteChangementDePuissance: {
          référenceParagraphe: '5.3.4',
          dispositions: `Avant l'achèvement, les modifications de la Puissance installée sont autorisées, sous réserve que la Puissance de l’Installation modifiée soit comprise entre quatre-vingt-dix pourcents (90%) et cent dix pourcents (110%) de la Puissance formulée dans l’offre. Elles doivent faire l’objet d’une information au Préfet.
 Les modifications à la baisse, en-dessous de 90% de la Puissance formulée dans l'offre et imposées par une décision de l’Etat à l’égard de toute autorisation administrative nécessaire à la réalisation du projet, sont autorisées. Elles doivent faire l’objet d’une information au Préfet.
 Des modifications à la baisse, en-dessous de 90% de la Puissance formulée dans l'offre et imposée par un événement extérieur au candidat, peuvent également être autorisées par le Préfet de manière exceptionnelle, sur demande dûment motivée.`,
        },
      },
    },
    {
      type: 'modifié',
      paruLe: '30/08/2022',
      url: 'https://www.cre.fr/media/Fichiers/publications/appelsoffres/cre-4-zni-1-2022-telecharger-l-avis-modificatif-publie-le-30-aout-2022',
      numéroGestionnaireRequis: true,
      donnéesCourriersRéponse: {
        texteChangementDePuissance: {
          référenceParagraphe: '5.3.4',
          dispositions: `Avant l'achèvement, les modifications de la Puissance installée sont autorisées, sous réserve que la Puissance de l’Installation modifiée soit comprise entre quatre-vingt-dix pourcents (90%) et cent dix pourcents (110%) de la Puissance formulée dans l’offre. Elles doivent faire l’objet d’une information au Préfet.
    Pour  les  projets  dont  soit  l'achèvement,  soit  la  mise  en  service  est  antérieur  au  31  décembre  2024,  cette  augmentation  de  puissance  peut  être  portée  à  140%  de  la  Puissance  formulée  dans  l’offre,  à condition qu’elle soit permise par l’autorisation d’urbanisme de l’Installation ( y compris si celle-ci a été modifiée)   et  que  la  Puissance  modifiée  soit i nférieure  au  plafond  de  puissance  de  la  famille  dans  laquelle entre l’offre.
    Les modifications à la baisse, en-dessous de 90% de la Puissance formulée dans l'offre et imposées par une  décision  de  l’Etat  à  l’égard  de  toute  autorisation  administrative  nécessaire  à  la  réalisation  du  projet, sont autorisées. Elles doivent faire l’objet d’une information au Préfet.
    Des modifications à la baisse, en-dessous de 90% de la Puissance formulée dans l'offre et imposée par un  événement  extérieur  au  candidat,  peuvent  également  être  autorisées  par  le  Préfet  de  manière  exceptionnelle, sur demande dûment motivée. `,
        },
      },
      délaiApplicable: {
        délaiEnMois: 18,
        intervaleDateMiseEnService: { min: new Date('2022-09-01'), max: new Date('2024-12-31') },
      },
    },
  ],
};
