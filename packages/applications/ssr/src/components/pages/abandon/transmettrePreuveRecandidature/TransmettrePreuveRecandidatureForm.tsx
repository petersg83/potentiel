'use client';

import { useState } from 'react';

import SelectNext from '@codegouvfr/react-dsfr/SelectNext';

import { transmettrePreuveRecandidatureAction } from './transmettrePreuveRecandidature.action';
import { useRouter } from 'next/navigation';
import { encodeParameter } from '@/utils/encodeParameter';
import { Form } from '@/components/atoms/form/Form';
import { SubmitButton } from '@/components/atoms/form/SubmitButton';

type ProjetÀSélectionner = {
  identifiantProjet: string;
  dateDésignation: string;
  nom: string;
};

type TransmettrePreuveRecandidatureFormProps = {
  identifiantProjet: string;
  projetsÀSélectionner: Array<ProjetÀSélectionner>;
  identifiantUtilisateur: string;
};

export const TransmettrePreuveRecandidatureForm = ({
  identifiantProjet,
  projetsÀSélectionner,
  identifiantUtilisateur,
}: TransmettrePreuveRecandidatureFormProps) => {
  const router = useRouter();

  const [projetSélectionné, setProjetSélectionné] = useState<{
    identifiantProjet: ProjetÀSélectionner['identifiantProjet'];
    dateDésignation: ProjetÀSélectionner['dateDésignation'];
  }>();

  return (
    <Form
      action={transmettrePreuveRecandidatureAction}
      method="post"
      onSuccess={() => router.push(`/laureats/${encodeParameter(identifiantProjet)}/abandon`)}
    >
      <input type={'hidden'} value={identifiantProjet} name="identifiantProjet" />
      <input type={'hidden'} value={identifiantUtilisateur} name="identifiantUtilisateur" />

      <SelectNext
        label="Choisir un projet comme preuve de recandidature"
        placeholder={`Sélectionner un projet`}
        nativeSelectProps={{
          onChange: ({ currentTarget: { value } }) => {
            const projet = projetsÀSélectionner.find(
              (projet) => projet.identifiantProjet === value,
            );

            if (projet) {
              setProjetSélectionné({
                identifiantProjet: projet.identifiantProjet,
                dateDésignation: projet.dateDésignation,
              });
            }
          },
        }}
        options={projetsÀSélectionner.map((projet) => ({
          label: projet.nom,
          value: projet.identifiantProjet,
        }))}
      />

      {projetSélectionné && (
        <>
          <input
            type={'hidden'}
            value={projetSélectionné.identifiantProjet}
            name="preuveRecandidature"
          />
          <input type={'hidden'} value={projetSélectionné.dateDésignation} name="dateDesignation" />
        </>
      )}

      <SubmitButton disabledCondition={() => !projetSélectionné}>
        Transmettre la preuve de recandidature
      </SubmitButton>
    </Form>
  );
};
