import React from 'react'
import { Project } from '@entities'
import { dataId } from '../../../helpers/testId'
import { Request } from 'express'

import {
  PageLayout,
  ModificationRequestActionTitles,
  UserDashboard,
  ProjectInfo,
  SuccessErrorBox,
  Button,
  FormulaireChampsObligatoireLégende,
  SecondaryLinkButton,
  InfoBox,
  ChoisirCahierDesChargesFormulaire,
  InfoLienGuideUtilisationCDC,
} from '@components'
import { hydrateOnClient } from '../../helpers'
import { ChangementActionnaire, ChangementPuissance, DemandeRecours } from './components'
import routes from '@routes'

type NewModificationRequestProps = {
  request: Request
  project: Project
  cahiersChargesURLs?: { oldCahierChargesURL?: string; newCahierChargesURL?: string }
}

export const NewModificationRequest = PageLayout(
  ({ request, project, cahiersChargesURLs }: NewModificationRequestProps) => {
    const { action, error, success, puissance, actionnaire, justification } =
      (request.query as any) || {}

    const doitChoisirCahierDesCharges =
      project.appelOffre?.choisirNouveauCahierDesCharges &&
      !project.nouvellesRèglesDInstructionChoisies

    const redirectionRoute = (action) => {
      switch (action) {
        case 'actionnaire':
          return routes.CHANGER_ACTIONNAIRE(project.id)
        case 'puissance':
          return routes.CHANGER_PUISSANCE(project.id)
        case 'recours':
          return routes.DEPOSER_RECOURS(project.id)
        default:
          return routes.USER_LIST_PROJECTS
      }
    }

    return (
      <UserDashboard currentPage={'list-projects'}>
        <div className="panel">
          <div className="panel__header">
            <h3>
              <ModificationRequestActionTitles action={action} />
            </h3>
          </div>
          {doitChoisirCahierDesCharges ? (
            <div className="flex flex-col max-w-2xl mx-auto">
              <InfoBox
                title="Afin d'accéder au formulaire de demande de modification, vous devez d'abord changer le
                  cahier des charges à appliquer"
                className="mb-5"
              >
                <InfoLienGuideUtilisationCDC />
              </InfoBox>
              <ChoisirCahierDesChargesFormulaire
                cahiersChargesURLs={cahiersChargesURLs}
                projet={project}
                redirectUrl={redirectionRoute(action)}
                type={action}
              />
            </div>
          ) : (
            <form action={routes.DEMANDE_ACTION} method="post" encType="multipart/form-data">
              <input type="hidden" name="projectId" value={project.id} />
              <input type="hidden" name="type" value={action} />

              <div className="form__group">
                <SuccessErrorBox success={success} error={error} />
                <FormulaireChampsObligatoireLégende className="text-right" />
                <div className="mb-2">Concernant le projet:</div>
                <ProjectInfo project={project} className="mb-3"></ProjectInfo>
                <div {...dataId('modificationRequest-demandesInputs')}>
                  {action === 'puissance' && (
                    <ChangementPuissance
                      {...{
                        project,
                        puissance,
                        justification,
                      }}
                    />
                  )}
                  {action === 'actionnaire' && (
                    <ChangementActionnaire {...{ project, actionnaire, justification }} />
                  )}
                  {action === 'recours' && <DemandeRecours {...{ justification }} />}

                  <Button
                    className="mt-3 mr-1"
                    type="submit"
                    id="submit"
                    {...dataId('submit-button')}
                  >
                    Envoyer
                  </Button>
                  <SecondaryLinkButton href={routes.USER_LIST_PROJECTS}>
                    Annuler
                  </SecondaryLinkButton>
                </div>
              </div>
            </form>
          )}
        </div>
      </UserDashboard>
    )
  }
)

hydrateOnClient(NewModificationRequest)
