'use client';

import { useRouter } from 'next/navigation';
import { modifierGestionnaireRéseauAction } from './modifierGestionnaireRéseau.action';
import Input from '@codegouvfr/react-dsfr/Input';
import { Form } from '@/components/atoms/form/Form';
import { useState } from 'react';
import { SubmitButton } from '@/components/atoms/form/SubmitButton';

export type ModifierGestionnaireRéseauFormProps = {
  identifiantGestionnaireRéseau: string;
  raisonSociale: string;
  expressionReguliere: string;
  format: string;
  légende: string;
};

export const ModifierGestionnaireRéseauForm = ({
  expressionReguliere,
  format,
  identifiantGestionnaireRéseau,
  légende,
  raisonSociale,
}: ModifierGestionnaireRéseauFormProps) => {
  const router = useRouter();

  const [validationErrors, setValidationErrors] = useState<Array<string>>([]);

  return (
    <Form
      action={modifierGestionnaireRéseauAction}
      method="post"
      encType="multipart/form-data"
      onSuccess={() => router.push('/reseau/gestionnaires')}
      onValidationError={(validationErrors) => setValidationErrors(validationErrors)}
    >
      <div className="mb-6">
        <label>Code EIC ou Gestionnaire: {identifiantGestionnaireRéseau}</label>
      </div>

      <input
        type={'hidden'}
        value={identifiantGestionnaireRéseau}
        name="identifiantGestionnaireReseau"
      />

      <Input
        textArea
        label="Raison sociale"
        id="raisonSociale"
        nativeTextAreaProps={{
          name: 'raisonSociale',
          defaultValue: raisonSociale,
        }}
        state={validationErrors.includes('raisonSociale') ? 'error' : 'default'}
        stateRelatedMessage="Raison sociale à préciser"
      />

      <Input
        textArea
        label="Format de l'identifiant du dossier de raccordement (optionnel)"
        id="format"
        nativeTextAreaProps={{
          name: 'format',
          defaultValue: format,
        }}
        state={validationErrors.includes('format') ? 'error' : 'default'}
        stateRelatedMessage="Format à préciser"
        hintText="Exemple : XXX-RP-AAAA-999999"
      />

      <Input
        textArea
        label="Aide à la saisie de l'identifiant du dossier de raccordement (optionnel)"
        id="legende"
        nativeTextAreaProps={{
          name: 'legende',
          defaultValue: légende,
        }}
        state={validationErrors.includes('legende') ? 'error' : 'default'}
        stateRelatedMessage="Légende à préciser"
        hintText="Exemple : X = caractère alphabétique en majuscule, AAAA = Année, 9 = caractère numérique de 0 à 9"
      />

      <Input
        textArea
        label="Expression régulière (optionnel)"
        id="expressionReguliere"
        nativeTextAreaProps={{
          name: 'expressionReguliere',
          value: expressionReguliere,
        }}
        state={validationErrors.includes('expressionReguliere') ? 'error' : 'default'}
        stateRelatedMessage="Raison sociale à préciser"
        hintText="Exemple : [a-zA-Z]{3}-RP-2[0-9]{3}-[0-9]{6}"
      />

      <SubmitButton>Envoyer</SubmitButton>
    </Form>
  );
};
