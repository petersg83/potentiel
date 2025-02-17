import { none } from '@potentiel/monads';
import { executeSelect } from '@potentiel/pg-helpers';
import { CahierDesCharges } from '@potentiel-domain/laureat';

const selectProjectQuery = `
  select json_build_object(
    'cahierDesCharges', "cahierDesChargesActuel"
  ) as value
  from "projects"
  where "appelOffreId" = $1 and "periodeId" = $2 and "numeroCRE" = $3 and "familleId" = $4
`;

export const consulterCahierDesChargesChoisiAdapter: CahierDesCharges.ConsulterCahierDesChargesChoisiPort =
  async ({ appelOffre, période, famille, numéroCRE }) => {
    const projets = await executeSelect<{
      value: {
        cahierDesCharges: string;
      };
    }>(selectProjectQuery, appelOffre, période, numéroCRE, famille);

    if (!projets.length) {
      return none;
    }

    const projet = projets[0].value;

    return projet.cahierDesCharges;
  };
