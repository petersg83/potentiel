import { BaseShouldUserAccessProject, makeRevokeRightsToProject } from '../modules/authZ';
import {
  makeAccorderDemandeDélai,
  makeAnnulerDemandeDélai,
  makeAnnulerRejetDélai,
  makeDemanderDélai,
  makeRejeterDemandeDélai,
  makePasserDemandeDélaiEnInstruction,
} from '../modules/demandeModification/demandeDélai';
import {
  makeDemanderAbandon,
  makeAnnulerDemandeAbandon,
  makeAccorderDemandeAbandon,
  makeRejeterDemandeAbandon,
  makeDemanderConfirmationAbandon,
  makeConfirmerDemandeAbandon,
  makeAnnulerRejetAbandon,
} from '../modules/demandeModification/demandeAbandon';
import { makeAnnulerDemandeAnnulationAbandon } from '../modules/demandeModification/demandeAnnulationAbandon';
import { makeAnnulerRejetRecours } from '../modules/demandeModification/demandeRecours';
import {
  makeAnnulerRejetChangementDePuissance,
  makeDemanderChangementDePuissance,
  exceedsPuissanceMaxDuVolumeReserve,
  exceedsRatiosChangementPuissance,
} from '../modules/demandeModification/demandeChangementDePuissance';
import { makeLoadFileForUser } from '../modules/file';
import {
  makeAcceptModificationRequest,
  makeAttachLegacyModificationFile,
  makeCancelModificationRequest,
  makeConfirmRequest,
  makeRejectModificationRequest,
  makeRequestActionnaireModification,
  makeRequestConfirmation,
  makeRequestFournisseursModification,
  makeChangerProducteur,
} from '../modules/modificationRequest';
import {
  makeAddGFExpirationDate,
  makeCorrectProjectData,
  makeGenerateCertificate,
  makeImportProjects,
  makeRegenerateCertificatesForPeriode,
  makeRemoveGF,
  makeSignalerDemandeAbandon,
  makeSignalerDemandeDelai,
  makeSignalerDemandeRecours,
  makeSubmitGF,
  makeChoisirCahierDesCharges,
  makeUploadGF,
  makeWithdrawGF,
  makeValiderGF,
  makeInvaliderGF,
} from '../modules/project';
import { makeClaimProject } from '../modules/projectClaim';
import { makeCreateUser, makeInviteUserToProject, makeRelanceInvitation } from '../modules/users';
import { buildCertificate } from '../views/certificates';
import { resendInvitationEmail } from './credentials.config';
import { eventStore } from './eventStore.config';
import {
  getFileProject,
  getLegacyModificationByFilename,
  getProjectAppelOffreId,
  getProjectDataForProjectClaim,
  getProjectIdsForPeriode,
  getPuissanceProjet,
  getUserByEmail,
  getUserById,
  hasDemandeDeMêmeTypeOuverte,
  hasGarantiesFinancières,
  isProjectParticipatif,
} from './queries.config';
import {
  demandeAbandonRepo,
  demandeDélaiRepo,
  fileRepo,
  modificationRequestRepo,
  oldAppelOffreRepo,
  oldProjectRepo,
  oldUserRepo,
  projectClaimRepo,
  projectRepo,
  userRepo,
  utilisateurRepo,
  demandeAnnulationAbandonRepo,
} from './repos.config';
import { sendNotification } from './emails.config';
import {
  makeNotifierPorteurChangementStatutDemande,
  makeNotifierPorteurRévocationAccèsProjet,
} from '../modules/notification';

import { makeCréerProfilUtilisateur, makeInviterUtilisateur } from '../modules/utilisateur';
import { makeDemanderAnnulationAbandon } from '../modules/demandeModification/demandeAnnulationAbandon/demander';
import { getProjectAppelOffre } from './queryProjectAO.config';
import { makeRejeterDemandeAnnulationAbandon } from '../modules/demandeModification/demandeAnnulationAbandon/rejeter';
import { makeAccorderAnnulationAbandon } from '../modules/demandeModification/demandeAnnulationAbandon/accorder/accorderAnnulationAbandon';

const publishToEventStore = eventStore.publish.bind(eventStore);

export const shouldUserAccessProject = new BaseShouldUserAccessProject(
  oldUserRepo,
  oldProjectRepo.findById,
);

export const generateCertificate = makeGenerateCertificate({
  fileRepo,
  projectRepo,
  buildCertificate,
  getUserById,
});

export const correctProjectData = makeCorrectProjectData({
  fileRepo,
  projectRepo,
  generateCertificate,
});

export const loadFileForUser = makeLoadFileForUser({
  fileRepo,
  shouldUserAccessProject,
  getFileProject,
});

export const acceptModificationRequest = makeAcceptModificationRequest({
  fileRepo,
  projectRepo,
  modificationRequestRepo,
});
export const rejectModificationRequest = makeRejectModificationRequest({
  fileRepo,
  modificationRequestRepo,
});
export const requestConfirmation = makeRequestConfirmation({
  fileRepo,
  modificationRequestRepo,
});

export const confirmRequest = makeConfirmRequest({
  modificationRequestRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
});

export const revokeUserRightsToProject = makeRevokeRightsToProject({
  eventBus: eventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
});

export const submitGF = makeSubmitGF({
  fileRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const uploadGF = makeUploadGF({
  fileRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const addGFExpirationDate = makeAddGFExpirationDate({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const removeGF = makeRemoveGF({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const withdrawGF = makeWithdrawGF({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const validerGF = makeValiderGF({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  publishToEventStore,
  projectRepo,
});

export const invaliderGF = makeInvaliderGF({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  publishToEventStore,
  projectRepo,
});

export const demanderChangementDePuissance = makeDemanderChangementDePuissance({
  eventBus: eventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  exceedsRatiosChangementPuissance,
  exceedsPuissanceMaxDuVolumeReserve,
  projectRepo,
  fileRepo,
  getPuissanceProjet,
});

export const requestActionnaireModification = makeRequestActionnaireModification({
  eventBus: eventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  fileRepo,
  isProjectParticipatif,
  hasGarantiesFinancières,
  getProjectAppelOffreId,
});

export const changerProducteur = makeChangerProducteur({
  eventBus: eventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  fileRepo,
  findAppelOffreById: oldAppelOffreRepo.findById,
});

export const requestFournisseurModification = makeRequestFournisseursModification({
  eventBus: eventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  fileRepo,
});

export const regenerateCertificatesForPeriode = makeRegenerateCertificatesForPeriode({
  eventBus: eventStore,
  generateCertificate,
  projectRepo,
  getProjectIdsForPeriode,
});

export const createUser = makeCreateUser({
  userRepo,
});

export const inviteUserToProject = makeInviteUserToProject({
  getUserByEmail,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  eventBus: eventStore,
  createUser,
});

export const relanceInvitation = makeRelanceInvitation({
  eventBus: eventStore,
  resendInvitationEmail,
});

export const cancelModificationRequest = makeCancelModificationRequest({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  modificationRequestRepo,
});

export const choisirCahierDesCharges = makeChoisirCahierDesCharges({
  publishToEventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  findAppelOffreById: oldAppelOffreRepo.findById,
});

export const importProjects = makeImportProjects({
  eventBus: eventStore,
  appelOffreRepo: oldAppelOffreRepo,
});

export const claimProject = makeClaimProject({
  projectClaimRepo,
  fileRepo,
  getProjectDataForProjectClaim,
  eventBus: eventStore,
});

export const attachLegacyModificationFile = makeAttachLegacyModificationFile({
  eventBus: eventStore,
  getLegacyModificationByFilename,
  fileRepo,
});

export const signalerDemandeDelai = makeSignalerDemandeDelai({
  fileRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const signalerDemandeAbandon = makeSignalerDemandeAbandon({
  fileRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  hasDemandeDeMêmeTypeOuverte,
});

export const signalerDemandeRecours = makeSignalerDemandeRecours({
  fileRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  hasDemandeDeMêmeTypeOuverte,
});

export const demanderDélai = makeDemanderDélai({
  fileRepo,
  findAppelOffreById: oldAppelOffreRepo.findById,
  publishToEventStore,
  getProjectAppelOffreId,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const annulerDemandeDélai = makeAnnulerDemandeDélai({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  demandeDélaiRepo,
  publishToEventStore,
});

export const rejeterDemandeDélai = makeRejeterDemandeDélai({
  fileRepo,
  demandeDélaiRepo,
  publishToEventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
});

export const accorderDemandeDélai = makeAccorderDemandeDélai({
  fileRepo,
  demandeDélaiRepo,
  publishToEventStore,
  projectRepo,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
});

export const annulerRejetDélai = makeAnnulerRejetDélai({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  demandeDélaiRepo,
  publishToEventStore,
});

export const passerDemandeDélaiEnInstruction = makePasserDemandeDélaiEnInstruction({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  demandeDélaiRepo,
  publishToEventStore,
});

export const annulerRejetRecours = makeAnnulerRejetRecours({
  modificationRequestRepo,
  publishToEventStore,
});

export const annulerRejetChangementDePuissance = makeAnnulerRejetChangementDePuissance({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  modificationRequestRepo,
  publishToEventStore,
});

export const demanderAbandon = makeDemanderAbandon({
  fileRepo,
  findAppelOffreById: oldAppelOffreRepo.findById,
  publishToEventStore,
  getProjectAppelOffreId,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
});

export const annulerDemandeAbandon = makeAnnulerDemandeAbandon({
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  demandeAbandonRepo,
  publishToEventStore,
});

export const accorderDemandeAbandon = makeAccorderDemandeAbandon({
  fileRepo,
  demandeAbandonRepo,
  publishToEventStore,
});

export const demanderConfirmationAbandon = makeDemanderConfirmationAbandon({
  fileRepo,
  demandeAbandonRepo,
  publishToEventStore,
});

export const confirmerDemandeAbandon = makeConfirmerDemandeAbandon({
  demandeAbandonRepo,
  aAccèsAuProjet: oldUserRepo.hasProject,
  publishToEventStore,
});

export const rejeterDemandeAbandon = makeRejeterDemandeAbandon({
  fileRepo,
  demandeAbandonRepo,
  publishToEventStore,
});

export const annulerRejetAbandon = makeAnnulerRejetAbandon({
  demandeAbandonRepo,
  publishToEventStore,
});

export const notifierPorteurChangementStatutDemande = makeNotifierPorteurChangementStatutDemande({
  sendNotification,
});

export const notifierPorteurRévocationAccèsProjet = makeNotifierPorteurRévocationAccèsProjet({
  sendNotification,
});

export const inviterUtilisateur = makeInviterUtilisateur({
  utilisateurRepo,
  publishToEventStore,
});

export const créerProfilUtilisateur = makeCréerProfilUtilisateur({
  utilisateurRepo,
  publishToEventStore,
});

export const demanderAnnulationAbandon = makeDemanderAnnulationAbandon({
  publishToEventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  projectRepo,
  getProjectAppelOffre,
});

export const annulerDemandeAnnulationAbandon = makeAnnulerDemandeAnnulationAbandon({
  publishToEventStore,
  shouldUserAccessProject: shouldUserAccessProject.check.bind(shouldUserAccessProject),
  demandeAnnulationAbandonRepo,
});

export const rejeterDemandeAnnulationAbandon = makeRejeterDemandeAnnulationAbandon({
  publishToEventStore,
  fileRepo,
  demandeAnnulationAbandonRepo,
});

export const accorderAnnulationAbandon = makeAccorderAnnulationAbandon({
  demandeAnnulationAbandonRepo,
  publishToEventStore,
  getProjectAppelOffre,
  projectRepo,
  fileRepo,
});
