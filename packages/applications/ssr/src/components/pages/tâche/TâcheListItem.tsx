import { FC } from 'react';
import Link from 'next/link';

import { Routes } from '@potentiel-libraries/routes';

import { formatDateForText } from '@/utils/formatDateForText';

export type TâcheListItemProps = {
  identifiantProjet: string;
  nomProjet: string;
  appelOffre: string;
  période: string;
  famille?: string;
  misÀJourLe: string;
  typeTâche: string;
};

export const TâcheListItem: FC<TâcheListItemProps> = ({
  identifiantProjet,
  nomProjet,
  appelOffre,
  période,
  famille,
  misÀJourLe,
  typeTâche,
}) => {
  const descriptionTâche = getDescriptionTâche(typeTâche, identifiantProjet, nomProjet);

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="italic text-sm mb-4">dernière mise à jour le {formatDateForText(misÀJourLe)}</p>
      <div className="flex flex-col gap-1">
        <h2 className="leading-4">
          À faire pour le projet : <span className="font-bold">{nomProjet}</span>
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
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <h3 className="font-bold">{descriptionTâche.titre}</h3>
        <p className="m-0 text-sm">{descriptionTâche.description}</p>
      </div>
      <Link
        href={descriptionTâche.lien}
        className="self-center mt-4 md:self-end md:mt-2"
        aria-label={descriptionTâche.ariaLabel}
      >
        {descriptionTâche.action}
      </Link>
    </div>
  );
};

const getDescriptionTâche = (
  typeTâche: TâcheListItemProps['typeTâche'],
  identifiantProjet: string,
  nomProjet: string,
) => {
  switch (typeTâche) {
    case 'abandon.confirmer':
      return {
        titre: `Confirmer votre demande d'abandon`,
        description: `La DGEC vous demande de confirmer votre demande d'abandon.`,
        lien: Routes.Abandon.détail(identifiantProjet),
        action: 'Voir la demande',
        ariaLabel: `Voir la demande de confirmation d'abandon pour le projet ${nomProjet}`,
      };
    case 'abandon.transmettre-preuve-recandidature':
      return {
        titre: 'Transmettre votre preuve de recandidature',
        description: `Suite à l'accord de votre demande d'abandon avec recandidature convernant ce projet, vous devez sélectionner un de vos projet comme preuve avant l'échéance du 31 mars 2025.`,
        lien: Routes.Abandon.transmettrePreuveRecandidature(identifiantProjet),
        action: 'Transmettre',
        ariaLabel: `Transmettre votre preuve de recandidature pour le projet ${nomProjet}`,
      };
    case 'raccordement.référence-non-transmise':
      return {
        titre: 'Référence non transmise',
        description: `La référence de votre dossier de raccordement n'a pas été transmise pour le projet ${nomProjet}`,
        lien: Routes.Raccordement.détail(identifiantProjet),
        action: 'Voir le raccordement',
        ariaLabel: `Voir le raccordement du projet ${nomProjet}`,
      };
    default: {
      return {
        titre: '',
        description: '',
        lien: '',
        action: '',
        aria: '',
      };
    }
  }
};
