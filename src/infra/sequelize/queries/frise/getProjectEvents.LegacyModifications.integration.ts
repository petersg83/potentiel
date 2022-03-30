import { User } from '@entities'
import { UniqueEntityID } from '@core/domain'
import { USER_ROLES } from '@modules/users'
import { getProjectEvents } from '.'
import { ProjectEvent } from '../../projectionsNext'
import { resetDatabase } from '../../helpers'
import { models } from '../../models'
import makeFakeProject from '../../../../__tests__/fixtures/project'

describe('getProjectEvents for LegacyModificationImported events', () => {
  const { Project } = models
  const projectId = new UniqueEntityID().toString()
  const fakeProject = makeFakeProject({ id: projectId, potentielIdentifier: 'pot-id' })

  beforeEach(async () => {
    await resetDatabase()
    await Project.create(fakeProject)
  })
  describe('when there is a legacy modification of type "delai"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy delai modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'delai',
                status: 'acceptée',
                ancienneDateLimiteAchevement: new Date('2022-01-01').getTime(),
                nouvelleDateLimiteAchevement: new Date('2024-01-01').getTime(),
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'delai',
                  status: 'acceptée',
                  ancienneDateLimiteAchevement: new Date('2022-01-01').getTime(),
                  nouvelleDateLimiteAchevement: new Date('2024-01-01').getTime(),
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy delai modifications', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'delai',
            status: 'acceptée',
            ancienneDateLimiteAchevement: new Date('2022-01-01').getTime(),
            nouvelleDateLimiteAchevement: new Date('2024-01-01').getTime(),
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })

  describe('when there is a legacy modification of type "abandon"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy "abandon" modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'abandon',
                status: 'acceptée',
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'abandon',
                  status: 'acceptée',
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy abandon modifications', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'abandon',
            status: 'acceptée',
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })

  describe('when there is a legacy modification of type "recours"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy "recours" modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'recours',
                status: 'acceptée',
                motifElimination: 'motif',
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'recours',
                  status: 'acceptée',
                  motifElimination: 'motif',
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy recours modifications', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'recours',
            status: 'acceptée',
            motifElimination: 'motif',
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })

  describe('when there is a legacy modification of type "actionnaire"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy "actionnaire" modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'actionnaire',
                actionnairePrecedent: 'nom actionnaire précédent',
                status: 'acceptée',
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'actionnaire',
                  actionnairePrecedent: 'nom actionnaire précédent',
                  status: 'acceptée',
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy actionnaire modifications', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'actionnaire',
            actionnairePrecedent: 'nom actionnaire précédent',
            status: 'acceptée',
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })

  describe('when there is a legacy modification of type "producteur"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy "producteur" modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'producteur',
                producteurPrecedent: 'nom producteur précédent',
                status: 'acceptée',
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'producteur',
                  producteurPrecedent: 'nom producteur précédent',
                  status: 'acceptée',
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy producteur modification', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'producteur',
            producteurPrecedent: 'nom producteur précédent',
            status: 'acceptée',
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })

  describe('when there is a legacy modification of type "autre"', () => {
    describe('when user is not ademe', () => {
      for (const role of USER_ROLES.filter((role) => role !== 'ademe')) {
        describe(`when the user is ${role}`, () => {
          const fakeUser = { role } as User

          it('should return the legacy "autre" modification', async () => {
            const date = new Date('2022-02-09')

            await ProjectEvent.create({
              id: new UniqueEntityID().toString(),
              projectId,
              type: 'LegacyModificationImported',
              valueDate: date.getTime(),
              eventPublishedAt: date.getTime(),
              payload: {
                modificationType: 'autre',
                column: 'col',
                value: 'val',
                status: 'acceptée',
              },
            })

            const result = await getProjectEvents({ projectId, user: fakeUser })
            expect(result._unsafeUnwrap()).toMatchObject({
              events: [
                {
                  type: 'LegacyModificationImported',
                  date: date.getTime(),
                  variant: role,
                  modificationType: 'autre',
                  column: 'col',
                  value: 'val',
                  status: 'acceptée',
                },
              ],
            })
          })
        })
      }
    })
    describe('when the user is ademe', () => {
      it('should not return the legacy producteur modification', async () => {
        const fakeUser = { role: 'ademe' } as User
        const date = new Date('2022-02-09')
        await ProjectEvent.create({
          id: new UniqueEntityID().toString(),
          projectId,
          type: 'LegacyModificationImported',
          valueDate: date.getTime(),
          eventPublishedAt: date.getTime(),
          payload: {
            modificationType: 'producteur',
            producteurPrecedent: 'nom producteur précédent',
          },
        })

        const result = await getProjectEvents({ projectId, user: fakeUser })
        expect(result._unsafeUnwrap()).toMatchObject({
          events: [],
        })
      })
    })
  })
})
