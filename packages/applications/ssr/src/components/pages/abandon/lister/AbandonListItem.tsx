import { FC } from 'react';
import Badge from '@codegouvfr/react-dsfr/Badge';
import { Abandon } from '@potentiel-domain/laureat';
import { StatutBadge } from '../../../molecules/StatutBadge';
import { encodeParameter } from '@/utils/encodeParameter';

type AbandonListItemProps = {
  identifiantProjet: string;
  nomProjet: string;
  appelOffre: string;
  période: string;
  famille?: string;
  statut: Abandon.StatutAbandon.RawType;
  misÀJourLe: string;
  recandidature: boolean;
};

export const AbandonListItem: FC<AbandonListItemProps> = ({
  identifiantProjet,
  nomProjet,
  appelOffre,
  période,
  famille,
  statut,
  misÀJourLe,
  recandidature,
}) => (
  <>
    <div>
      <div className="flex flex-col gap-1">
        <h2 className="leading-4">
          Abandon du projet <span className="font-bold">{nomProjet}</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 italic text-xs">
          <div>
            Appel d'offres : {appelOffre}
            <span className="hidden md:inline-block mr-2">,</span>
          </div>
          <div>Période : {période}</div>
          {famille && (
            <div>
              <span className="hidden md:inline-block mr-2">,</span>
              Famille : {famille}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-3">
          <StatutBadge statut={statut} small />
          {recandidature && (
            <Badge noIcon small severity="info">
              avec recandidature
            </Badge>
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-between mt-4 md:mt-2">
      <p className="italic text-sm">dernière mise à jour le {misÀJourLe}</p>
      <a
        href={`/laureats/${encodeParameter(identifiantProjet)}/abandon`}
        className="self-end mt-2"
        aria-label={`voir le détail de l'abandon en statut ${statut} pour le projet ${nomProjet}`}
      >
        voir le détail
      </a>
    </div>
  </>
);
