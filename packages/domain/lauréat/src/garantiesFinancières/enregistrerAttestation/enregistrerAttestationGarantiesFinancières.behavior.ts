import { DateTime, IdentifiantProjet } from '@potentiel-domain/common';
import { DomainEvent, NotFoundError } from '@potentiel-domain/core';

import { GarantiesFinancièresAggregate } from '../garantiesFinancières.aggregate';
import { IdentifiantUtilisateur } from '@potentiel-domain/utilisateur';
import { DateConstitutionDansLeFutur } from '../dateConstitutionDansLeFutur.error';
import { DocumentProjet } from '@potentiel-domain/document';

export type AttestationGarantiesFinancièresEnregistréeEvent = DomainEvent<
  'AttestationGarantiesFinancièresEnregistrée-V1',
  {
    identifiantProjet: IdentifiantProjet.RawType;
    attestation: { format: string };
    dateConstitution: DateTime.RawType;
    enregistréLe: DateTime.RawType;
    enregistréPar: IdentifiantUtilisateur.RawType;
  }
>;

export type Options = {
  identifiantProjet: IdentifiantProjet.ValueType;
  attestation: DocumentProjet.ValueType;
  dateConstitution: DateTime.ValueType;
  enregistréLe: DateTime.ValueType;
  enregistréPar: IdentifiantUtilisateur.ValueType;
};

export async function enregistrerAttestation(
  this: GarantiesFinancièresAggregate,
  { attestation, dateConstitution, identifiantProjet, enregistréLe, enregistréPar }: Options,
) {
  if (!this.actuelles) {
    throw new AucunesGarantiesFinancièresValidées();
  }
  if (this.actuelles.dateConstitution && this.actuelles.attestation) {
    throw new AttestationGarantiesFinancièresDéjàExistante();
  }
  if (dateConstitution.estDansLeFutur()) {
    throw new DateConstitutionDansLeFutur();
  }

  const event: AttestationGarantiesFinancièresEnregistréeEvent = {
    type: 'AttestationGarantiesFinancièresEnregistrée-V1',
    payload: {
      attestation: { format: attestation.format },
      dateConstitution: dateConstitution.formatter(),
      identifiantProjet: identifiantProjet.formatter(),
      enregistréLe: enregistréLe.formatter(),
      enregistréPar: enregistréPar.formatter(),
    },
  };

  await this.publish(event);
}

export function applyEnregistrerAttestationGarantiesFinancières(
  this: GarantiesFinancièresAggregate,
  { payload: { dateConstitution, attestation } }: AttestationGarantiesFinancièresEnregistréeEvent,
) {
  if (this.actuelles) {
    this.actuelles.dateConstitution = DateTime.convertirEnValueType(dateConstitution);
    this.actuelles.attestation = attestation;
  }
}

class AucunesGarantiesFinancièresValidées extends NotFoundError {
  constructor() {
    super(`Il n'y a aucunes garanties financières validées pour ce projet`);
  }
}

class AttestationGarantiesFinancièresDéjàExistante extends NotFoundError {
  constructor() {
    super(`Il y a déjà une attestation pour ces garanties financières`);
  }
}
