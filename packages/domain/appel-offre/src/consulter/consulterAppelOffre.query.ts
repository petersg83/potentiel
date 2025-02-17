import { Message, MessageHandler, mediator } from 'mediateur';
import { Find } from '@potentiel-domain/core';
import { AppelOffre, AppelOffreEntity } from '../appelOffre.entity';
import { isNone } from '@potentiel/monads';
import { AppelOffreInconnuErreur } from '../appelOffreInconnu.error';

export type ConsulterAppelOffreReadModel = AppelOffre;

export type ConsulterAppelOffreQuery = Message<
  'AppelOffre.Query.ConsulterAppelOffre',
  {
    identifiantAppelOffre: string;
  },
  ConsulterAppelOffreReadModel
>;

export type ConsulterAppelOffreDependencies = {
  find: Find;
};

export const registerConsulterAppelOffreQuery = ({ find }: ConsulterAppelOffreDependencies) => {
  const handler: MessageHandler<ConsulterAppelOffreQuery> = async ({ identifiantAppelOffre }) => {
    const result = await find<AppelOffreEntity>(`appel-offre|${identifiantAppelOffre}`);

    if (isNone(result)) {
      throw new AppelOffreInconnuErreur();
    }

    return result;
  };

  mediator.register('AppelOffre.Query.ConsulterAppelOffre', handler);
};
