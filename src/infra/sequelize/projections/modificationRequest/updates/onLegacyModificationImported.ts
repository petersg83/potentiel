import { logger } from '../../../../../core/utils'
import { LegacyModificationImported } from '../../../../../modules/modificationRequest/events'

export const onLegacyModificationImported =
  (models) => async (event: LegacyModificationImported) => {
    const { ModificationRequest } = models
    const { projectId, modifications } = event.payload

    try {
      await ModificationRequest.destroy({ where: { projectId, isLegacy: true } })

      for (const modification of modifications) {
        const common = {
          id: modification.modificationId,
          type: modification.type,
          status: 'acceptée',
          respondedOn: modification.modifiedOn,
          requestedOn: modification.modifiedOn,
          projectId,
          versionDate: event.occurredAt,
          isLegacy: true,
        }
        switch (modification.type) {
          case 'abandon':
            await ModificationRequest.create({
              ...common,
            })
            break
          case 'actionnaire':
            await ModificationRequest.create({
              ...common,
              acceptanceParams: {
                actionnairePrecedent: modification.actionnairePrecedent,
                siretPrecedent: modification.siretPrecedent,
              },
            })
            break
          case 'delai':
            await ModificationRequest.create({
              ...common,
              acceptanceParams: {
                nouvelleDateLimiteAchevement: modification.nouvelleDateLimiteAchevement,
                ancienneDateLimiteAchevement: modification.ancienneDateLimiteAchevement,
              },
            })
            break
          case 'producteur':
            await ModificationRequest.create({
              ...common,
              acceptanceParams: {
                producteurPrecedent: modification.producteurPrecedent,
              },
            })
            break
          case 'recours':
            await ModificationRequest.create({
              ...common,
              acceptanceParams: {
                motifElimination: modification.motifElimination,
              },
              status: modification.accepted ? 'acceptée' : 'rejetée',
            })
            break
        }
      }
    } catch (e) {
      logger.error(e)
      logger.info(
        'Error: onLegacyModificationImported projection failed to update project :',
        event
      )
    }
  }
