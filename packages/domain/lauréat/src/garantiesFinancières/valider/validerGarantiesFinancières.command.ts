import { Message, MessageHandler, mediator } from 'mediateur';

import { DateTime, IdentifiantProjet } from '@potentiel-domain/common';

import { LoadAggregate } from '@potentiel-domain/core';
import { loadGarantiesFinancièresFactory } from '../garantiesFinancières.aggregate';
import { IdentifiantUtilisateur } from '@potentiel-domain/utilisateur';

export type ValiderGarantiesFinancièresCommand = Message<
  'Lauréat.GarantiesFinancières.Command.ValiderGarantiesFinancières',
  {
    identifiantProjet: IdentifiantProjet.ValueType;
    validéLe: DateTime.ValueType;
    validéPar: IdentifiantUtilisateur.ValueType;
  }
>;

export const registerValiderGarantiesFinancièresCommand = (loadAggregate: LoadAggregate) => {
  const loadGarantiesFinancières = loadGarantiesFinancièresFactory(loadAggregate);
  const handler: MessageHandler<ValiderGarantiesFinancièresCommand> = async ({
    identifiantProjet,
    validéLe,
    validéPar,
  }) => {
    const garantiesFinancières = await loadGarantiesFinancières(identifiantProjet, false);
    await garantiesFinancières.valider({
      identifiantProjet,
      validéLe,
      validéPar,
    });
  };
  mediator.register('Lauréat.GarantiesFinancières.Command.ValiderGarantiesFinancières', handler);
};
