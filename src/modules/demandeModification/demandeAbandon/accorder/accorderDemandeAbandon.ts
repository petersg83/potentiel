import { User } from '../../../../entities';
import {
  EventStore,
  Repository,
  TransactionalRepository,
  UniqueEntityID,
} from '../../../../core/domain';
import { DemandeAbandon } from '../DemandeAbandon';
import { errAsync } from '../../../../core/utils';
import { InfraNotAvailableError, UnauthorizedError } from '../../../shared';
import { userIsNot } from '../../../users';
import { FileContents, FileObject, makeAndSaveFile } from '../../../file';

import { AbandonAccordé } from '../events';
import { AccorderDemandeAbandonError } from './AccorderDemandeAbandonError';

type AccorderDemandeAbandonProps = {
  user: User;
  demandeAbandonId: string;
  fichierRéponse: { contents: FileContents; filename: string };
};

type MakeAccorderDemandeAbandonProps = {
  demandeAbandonRepo: Repository<DemandeAbandon> & TransactionalRepository<DemandeAbandon>;
  publishToEventStore: EventStore['publish'];
  fileRepo: Repository<FileObject>;
};

export const makeAccorderDemandeAbandon =
  ({ demandeAbandonRepo, publishToEventStore, fileRepo }: MakeAccorderDemandeAbandonProps) =>
  ({ user, demandeAbandonId, fichierRéponse }: AccorderDemandeAbandonProps) => {
    if (userIsNot(['admin', 'dgec-validateur'])(user)) {
      return errAsync(new UnauthorizedError());
    }

    return demandeAbandonRepo.transaction(
      new UniqueEntityID(demandeAbandonId),
      (demandeAbandon) => {
        const { projetId, statut } = demandeAbandon;
        if (!projetId) return errAsync(new InfraNotAvailableError());

        if (!['envoyée', 'en instruction', 'demande confirmée'].includes(statut)) {
          return errAsync(
            new AccorderDemandeAbandonError(
              demandeAbandon,
              `Seule une demande ayant le statut "envoyée", "en instruction" ou "demande confirmée" peut être accordée.`,
            ),
          );
        }

        return makeAndSaveFile({
          file: {
            designation: 'modification-request-response',
            forProject: new UniqueEntityID(projetId),
            createdBy: new UniqueEntityID(user.id),
            filename: fichierRéponse.filename,
            contents: fichierRéponse.contents,
          },
          fileRepo,
        }).andThen((fichierRéponseId) => {
          return publishToEventStore(
            new AbandonAccordé({
              payload: {
                accordéPar: user.id,
                projetId,
                demandeAbandonId,
                fichierRéponseId,
              },
            }),
          );
        });
      },
    );
  };
