import { Project, AppelOffre } from '../../../entities'
import ROUTES from '../../../routes'

const adminActions = (project: Project) => {
  const canDownloadCertificate =
    project.appelOffre?.periode?.isNotifiedOnPotentiel

  return [
    {
      title: 'Voir attestation',
      link: ROUTES.CANDIDATE_CERTIFICATE_FOR_ADMINS(project),
      isDownload: true,
      disabled: !canDownloadCertificate,
    },
  ]
}

export { adminActions }
