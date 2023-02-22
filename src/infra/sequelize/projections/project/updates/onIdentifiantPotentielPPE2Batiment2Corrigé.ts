import { logger } from '@core/utils';
import { IdentifiantPotentielPPE2Batiment2Corrigé } from '@modules/project';
import { ProjectionEnEchec } from '@modules/shared';

export const onIdentifiantPotentielPPE2Batiment2Corrigé =
  (models) => async (évènement: IdentifiantPotentielPPE2Batiment2Corrigé) => {
    const { projectId, nouvelIdentifiant } = évènement.payload;
    const { Project } = models;
    const projectInstance = await Project.findByPk(projectId);

    if (!projectInstance) {
      logger.error(
        new ProjectionEnEchec(`Le projet n'existe pas`, {
          nomProjection: 'onIdentifiantPotentielPPE2Batiment2Corrigé',
          évènement,
        }),
      );
      return;
    }

    projectInstance.potentielIdentifier = nouvelIdentifiant;

    try {
      await projectInstance.save();
    } catch (e) {
      logger.error(
        new ProjectionEnEchec(
          `Erreur lors de l'enregistrement des modifications sur la projection Project`,
          {
            nomProjection: 'onIdentifiantPotentielPPE2Batiment2Corrigé',
            évènement,
          },
          e,
        ),
      );
    }
  };
