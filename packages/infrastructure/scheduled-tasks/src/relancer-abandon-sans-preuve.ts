import { mediator } from 'mediateur';
import {
  Abandon,
  registerLauréatQueries,
  registerLauréatUseCases,
} from '@potentiel-domain/laureat';
import { DateTime } from '@potentiel-domain/common';
import { findProjection, listProjection } from '@potentiel-infrastructure/pg-projections';
import { loadAggregate } from '@potentiel-infrastructure/pg-event-sourcing';
import { getLogger } from '@potentiel/monitoring';
import {
  consulterCahierDesChargesChoisiAdapter,
  listerAbandonsAdapter,
  listerAbandonsPourPorteurAdapter,
  récupérerRégionDreal,
} from '@potentiel-infrastructure/domain-adapters';
import { getModèleRéponseAbandon } from '@potentiel-infrastructure/document-builder';

registerLauréatQueries({
  find: findProjection,
  list: listProjection,
  consulterCahierDesChargesAdapter: consulterCahierDesChargesChoisiAdapter,
  listerAbandonsPourPorteur: listerAbandonsPourPorteurAdapter,
  buildModèleRéponseAbandon: getModèleRéponseAbandon,
  listerAbandons: listerAbandonsAdapter,
  récupérerRégionDreal: récupérerRégionDreal,
});

registerLauréatUseCases({
  loadAggregate,
});

(async () => {
  const abandonsÀRelancer =
    await mediator.send<Abandon.ListerAbandonsAvecRecandidatureÀRelancerQuery>({
      type: 'Lauréat.Abandon.Query.ListerAbandonsAvecRecandidatureÀRelancer',
      data: {},
    });

  for (const { identifiantProjet } of abandonsÀRelancer.résultats) {
    try {
      await mediator.send<Abandon.AbandonUseCase>({
        type: 'Lauréat.Abandon.UseCase.DemanderPreuveRecandidatureAbandon',
        data: {
          dateDemandeValue: DateTime.now().formatter(),
          identifiantProjetValue: identifiantProjet.formatter(),
        },
      });
    } catch (e) {
      getLogger().error(e as Error);
    }
  }
})();
