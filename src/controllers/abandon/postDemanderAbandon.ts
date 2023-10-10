import fs from 'fs';
import * as yup from 'yup';

import { demanderAbandon, ensureRole, getIdentifiantProjetByLegacyId } from '../../config';
import { logger, wrapInfra } from '../../core/utils';
import { UnauthorizedError } from '../../modules/shared';
import routes from '../../routes';
import { addQueryParams } from '../../helpers/addQueryParams';
import { errorResponse, unauthorizedResponse } from '../helpers';
import { upload } from '../upload';
import { v1Router } from '../v1Router';
import safeAsyncHandler from '../helpers/safeAsyncHandler';
import { mediator } from 'mediateur';
import {
  DomainUseCase,
  convertirEnDateTime,
  convertirEnIdentifiantProjet,
  convertirEnIdentifiantUtilisateur,
} from '@potentiel/domain';
import { FileReadableStream } from '../../helpers/fileReadableStream';
import { none } from '@potentiel/monads';

const schema = yup.object({
  body: yup.object({
    projectId: yup.string().uuid().required(),
    justification: yup.string().optional(),
    abandonAvecRecandidature: yup.string().optional(),
  }),
});

v1Router.post(
  routes.POST_DEMANDER_ABANDON,
  ensureRole('porteur-projet'),
  upload.single('file'),
  safeAsyncHandler(
    {
      schema,
      onError: ({ request, response, error }) =>
        response.redirect(
          addQueryParams(routes.GET_DEMANDER_ABANDON(request.body.projectId), {
            ...error.errors,
          }),
        ),
    },
    async (request, response) => {
      const { user } = request;
      const { projectId, justification, abandonAvecRecandidature } = request.body;

      const file = request.file && {
        contents: fs.createReadStream(request.file.path),
        filename: `${Date.now()}-${request.file.originalname}`,
      };

      const sendToMediator = new Promise<void>(async (resolve) => {
        const identifiantProjet = await getIdentifiantProjetByLegacyId(projectId);
        try {
          await mediator.send<DomainUseCase>({
            type: 'DEMANDER_ABANDON_USECASE',
            data: {
              identifiantProjet: convertirEnIdentifiantProjet({
                appelOffre: identifiantProjet?.appelOffre || '',
                famille: identifiantProjet?.famille || none,
                numéroCRE: identifiantProjet?.numéroCRE || '',
                période: identifiantProjet?.période || '',
              }),
              pièceJustificative: request.file && {
                format: request.file.mimetype,
                content: new FileReadableStream(request.file.path),
              },
              dateDemandeAbandon: convertirEnDateTime(new Date()),
              recandidature: !!abandonAvecRecandidature,
              raison: justification || '',
              demandéPar: convertirEnIdentifiantUtilisateur(request.user.email),
            },
          });
        } catch (e) {
          logger.error(e);
        }

        resolve();
      });

      return demanderAbandon({
        user,
        projectId,
        file,
        justification,
      })
        .andThen(() => wrapInfra(sendToMediator))
        .match(
          () => {
            return response.redirect(
              routes.SUCCESS_OR_ERROR_PAGE({
                success: `Votre demande d'abandon a bien été envoyée.`,
                redirectUrl: routes.PROJECT_DETAILS(projectId),
                redirectTitle: 'Retourner à la page projet',
              }),
            );
          },
          (error) => {
            if (error instanceof UnauthorizedError) {
              return unauthorizedResponse({ request, response });
            }

            logger.error(error);
            return errorResponse({
              request,
              response,
              customMessage:
                'Il y a eu une erreur lors de la soumission de votre demande. Merci de recommencer.',
            });
          },
        );
    },
  ),
);
