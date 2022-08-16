import type { Request } from 'express'
import React from 'react'
import { AdminDashboard, PageLayout } from '@components'

type AdminStatistiquesProps = {
  request: Request
  iframeUrl: string
}

/* Pure component */
export const AdminStatistiques = PageLayout(function (props: AdminStatistiquesProps) {
  return (
    <AdminDashboard currentPage="admin-statistiques" role="admin">
      <main role="main" className="panel">
        <div className="panel__header">
          <h3>Tableau de bord</h3>
        </div>
        <section className="section section-white" style={{ paddingTop: 0 }}>
          <script src="https://metabase.potentiel.beta.gouv.fr/app/iframeResizer.js"></script>
          <div
            className="container"
            dangerouslySetInnerHTML={{
              __html: `<iframe
            src="${props.iframeUrl}"
            frameBorder="0"
            width="100%"
            allowTransparency
            onload="iFrameResize({}, this)"
          ></iframe>`,
            }}
          ></div>
        </section>
      </main>
    </AdminDashboard>
  )
})
