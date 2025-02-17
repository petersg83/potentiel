import {
  DownloadLinkButton,
  SecondaryLinkButton,
  DropdownMenuSecondaryButton,
  PrimaryButton,
  PrintIcon,
} from '../../../components';
import { User } from '../../../../entities';
import { ProjectDataForProjectPage } from '../../../../modules/project';
import { userIs } from '../../../../modules/users';
import routes from '../../../../routes';
import React from 'react';
import { Routes } from '@potentiel-libraries/routes';
import { formatProjectDataToIdentifiantProjetValueType } from '../../../../helpers/dataToValueTypes';

type ProjectActionsProps = {
  project: ProjectDataForProjectPage;
  user: User;
  abandonEnCours: boolean;
  modificationsNonPermisesParLeCDCActuel: boolean;
};

type EnregistrerUneModificationProps = {
  project: ProjectDataForProjectPage;
  signalementRecoursAutorisé?: true;
};

const EnregistrerUneModification = ({
  project,
  signalementRecoursAutorisé,
}: EnregistrerUneModificationProps) => (
  <DropdownMenuSecondaryButton buttonChildren="Enregistrer une modification">
    <DropdownMenuSecondaryButton.DropdownItem
      href={routes.ADMIN_SIGNALER_DEMANDE_DELAI_PAGE(project.id)}
    >
      <span>Demande de délai</span>
    </DropdownMenuSecondaryButton.DropdownItem>
    {signalementRecoursAutorisé && getProjectStatus(project) === 'éliminé' ? (
      <DropdownMenuSecondaryButton.DropdownItem
        href={routes.ADMIN_SIGNALER_DEMANDE_RECOURS_GET(project.id)}
      >
        <span>Demande de recours</span>
      </DropdownMenuSecondaryButton.DropdownItem>
    ) : (
      <></>
    )}
  </DropdownMenuSecondaryButton>
);

const getProjectStatus = (project: ProjectDataForProjectPage) =>
  !project.notifiedOn
    ? 'non-notifié'
    : project.isAbandoned
    ? 'abandonné'
    : project.isClasse
    ? 'lauréat'
    : 'éliminé';

type PorteurProjetActionsProps = {
  project: ProjectDataForProjectPage;
  abandonEnCours: boolean;
  modificationsNonPermisesParLeCDCActuel: boolean;
};
const PorteurProjetActions = ({
  project,
  abandonEnCours,
  modificationsNonPermisesParLeCDCActuel,
}: PorteurProjetActionsProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col xl:flex-row gap-2">
      {!project.isClasse && (
        <SecondaryLinkButton href={routes.DEPOSER_RECOURS(project.id)}>
          Faire une demande de recours
        </SecondaryLinkButton>
      )}

      {project.isClasse && (
        <DropdownMenuSecondaryButton buttonChildren="Faire une demande" className="w-fit">
          <DropdownMenuSecondaryButton.DropdownItem href={routes.DEMANDER_DELAI(project.id)}>
            <span>Demander un délai</span>
          </DropdownMenuSecondaryButton.DropdownItem>
          {project.appelOffre.changementProducteurPossibleAvantAchèvement && (
            <DropdownMenuSecondaryButton.DropdownItem
              href={routes.GET_CHANGER_PRODUCTEUR(project.id)}
            >
              <span>Changer de producteur</span>
            </DropdownMenuSecondaryButton.DropdownItem>
          )}
          <DropdownMenuSecondaryButton.DropdownItem href={routes.CHANGER_FOURNISSEUR(project.id)}>
            <span>Changer de fournisseur</span>
          </DropdownMenuSecondaryButton.DropdownItem>
          <DropdownMenuSecondaryButton.DropdownItem href={routes.CHANGER_ACTIONNAIRE(project.id)}>
            <span>Changer d'actionnaire</span>
          </DropdownMenuSecondaryButton.DropdownItem>
          <DropdownMenuSecondaryButton.DropdownItem
            href={routes.DEMANDER_CHANGEMENT_PUISSANCE(project.id)}
          >
            <span>Changer de puissance</span>
          </DropdownMenuSecondaryButton.DropdownItem>
          {!abandonEnCours && (
            <DropdownMenuSecondaryButton.DropdownItem
              href={Routes.Abandon.demander(
                formatProjectDataToIdentifiantProjetValueType({
                  appelOffreId: project.appelOffreId,
                  periodeId: project.periodeId,
                  familleId: project.familleId,
                  numeroCRE: project.numeroCRE,
                }).formatter(),
              )}
              {...(modificationsNonPermisesParLeCDCActuel && { disabled: true })}
            >
              <span>Demander un abandon</span>
            </DropdownMenuSecondaryButton.DropdownItem>
          )}
        </DropdownMenuSecondaryButton>
      )}

      {project.notifiedOn && project.certificateFile && (
        <DownloadLinkButton
          className="w-fit"
          fileUrl={routes.CANDIDATE_CERTIFICATE_FOR_CANDIDATES({
            id: project.id,
            certificateFileId: project.certificateFile.id,
            nomProjet: project.nomProjet,
            potentielIdentifier: project.potentielIdentifier,
          })}
        >
          Télécharger mon attestation
        </DownloadLinkButton>
      )}
      <PrimaryButton onClick={() => window.print()}>
        <PrintIcon className="text-white mr-2" aria-hidden />
        Imprimer la page
      </PrimaryButton>
    </div>
  </div>
);

type AdminActionsProps = {
  project: ProjectDataForProjectPage;
  signalementAbandonAutorisé: true;
  signalementRecoursAutorisé: true;
};
const AdminActions = ({
  project,
  signalementAbandonAutorisé,
  signalementRecoursAutorisé,
}: AdminActionsProps) => (
  <div className="flex flex-col md:flex-row gap-2">
    <EnregistrerUneModification
      {...{ project, signalementAbandonAutorisé, signalementRecoursAutorisé }}
    />

    {project.notifiedOn && project.certificateFile ? (
      <DownloadLinkButton
        fileUrl={routes.CANDIDATE_CERTIFICATE_FOR_ADMINS({
          id: project.id,
          certificateFileId: project.certificateFile.id,
          email: project.email,
          potentielIdentifier: project.potentielIdentifier,
        })}
        className="m-auto"
      >
        Voir attestation
      </DownloadLinkButton>
    ) : (
      !project.isLegacy && (
        <DownloadLinkButton
          fileUrl={routes.PREVIEW_CANDIDATE_CERTIFICATE(project)}
          className="m-auto"
        >
          Aperçu attestation
        </DownloadLinkButton>
      )
    )}
  </div>
);

export const ProjectActions = ({
  project,
  user,
  abandonEnCours,
  modificationsNonPermisesParLeCDCActuel,
}: ProjectActionsProps) => (
  <div className="print:hidden whitespace-nowrap">
    {userIs(['admin', 'dgec-validateur'])(user) && (
      <AdminActions
        {...{ project, signalementAbandonAutorisé: true, signalementRecoursAutorisé: true }}
      />
    )}
    {userIs(['porteur-projet'])(user) && (
      <PorteurProjetActions
        {...{ project, abandonEnCours, modificationsNonPermisesParLeCDCActuel }}
      />
    )}
    {userIs(['dreal'])(user) && <EnregistrerUneModification {...{ project }} />}
  </div>
);
