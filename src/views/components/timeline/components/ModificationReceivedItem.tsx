import { Link } from '@components'
import React from 'react'
import { ItemDate, ItemTitle, ContentArea, PastIcon } from '.'
import { ModificationReceivedItemProps } from '../helpers'
export const ModificationReceivedItem = (props: ModificationReceivedItemProps) => {
  const { date } = props
  return (
    <>
      <PastIcon />
      <ContentArea>
        <ItemDate date={date} />
        <Details {...props} />
      </ContentArea>
    </>
  )
}

const Details = (props: ModificationReceivedItemProps) => {
  const { modificationType, detailsUrl } = props
  const libelleTypeDemande: { [key in ModificationReceivedItemProps['modificationType']]: string } =
    {
      producteur: 'Changement de producteur',
      actionnaire: 'Modification de l’actionnariat',
      fournisseur: 'Changement de fournisseur(s) ou de produit',
      puissance: 'Modification de la puissance installée',
    }

  return (
    <>
      <ItemTitle title={`${libelleTypeDemande[modificationType]}`} />
      {modificationType === 'producteur' && (
        <p className="p-0 m-0">Producteur : {props.producteur}</p>
      )}
      {modificationType === 'actionnaire' && (
        <p className="p-0 m-0">Actionnaire : {props.actionnaire}</p>
      )}
      {modificationType === 'puissance' && (
        <p className="p-0 m-0">
          Puissance : {props.puissance} {props.unitePuissance}
        </p>
      )}
      {modificationType === 'fournisseur' && (
        <ul className="list-none p-0">
          {props.fournisseurs.map((fournisseur, index) => (
            <li key={`modification-received-fournisseur-${index}`}>
              {fournisseur.kind} : {fournisseur.name}
            </li>
          ))}
        </ul>
      )}
      {detailsUrl && <Link href={detailsUrl}>Voir la demande</Link>}
    </>
  )
}
