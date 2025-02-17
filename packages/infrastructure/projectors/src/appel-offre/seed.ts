import { appelsOffreData } from '@potentiel/domain-inmemory-referential';
import { getLogger } from '@potentiel/monitoring';
import { removeProjectionByCategory } from '../utils/removeProjectionByCategory';
import { createProjection } from '../utils/createProjection';

export const seedAppelOffre = async () => {
  getLogger().info('Starting to seed referential data...');

  // Delete all appel offre projections
  getLogger().info('Removing all appel offre projections...');
  await removeProjectionByCategory('appel-offre');

  // Seed all appels offres from inmemory data
  getLogger().info('Add all appel offre in memory data as projections...');

  for (const appelOffre of appelsOffreData) {
    const appelOffreReadModelKey: `${string}|${string}` = `appel-offre|${appelOffre.id}`;
    await createProjection(appelOffreReadModelKey, appelOffre);
  }
};
