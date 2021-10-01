import { LegacyModificationDTO } from '..'
import { DomainEvent, UniqueEntityID } from '../../../core/domain'
import { okAsync } from '../../../core/utils'
import { FindProjectByIdentifiers } from '../../project'
import { InfraNotAvailableError } from '../../shared'
import {
  LegacyModificationImported,
  LegacyModificationRawDataImported,
  ModificationRequestInstructionStarted,
  ResponseTemplateDownloaded,
} from '../events'
import { GetModificationRequestStatus } from '../queries/GetModificationRequestStatus'
import { handleLegacyModificationRawDataImported } from './handleLegacyModificationRawDataImported'

const eventBus = {
  publish: jest.fn((event: DomainEvent) => okAsync<null, InfraNotAvailableError>(null)),
  subscribe: jest.fn(),
}

const projectId = new UniqueEntityID().toString()
const importId = new UniqueEntityID().toString()
const appelOffreId = 'appelOffreId'
const periodeId = 'periodeId'
const familleId = 'familleId'
const numeroCRE = 'numeroCRE'
const modifications = [
  {
    type: 'abandon',
    modifiedOn: 123,
  } as LegacyModificationDTO,
]

describe('handleLegacyModificationRawDataImported', () => {
  describe('when the project exists', () => {
    const findProjectByIdentifiers = jest.fn(() =>
      okAsync(projectId)
    ) as unknown as FindProjectByIdentifiers

    beforeAll(async () => {
      eventBus.publish.mockClear()

      await handleLegacyModificationRawDataImported({
        eventBus,
        findProjectByIdentifiers,
      })(
        new LegacyModificationRawDataImported({
          payload: { importId, appelOffreId, periodeId, familleId, numeroCRE, modifications },
        })
      )
    })

    it('should trigger LegacyModificationImported with the projectId', () => {
      const targetEvent = eventBus.publish.mock.calls
        .map((call) => call[0])
        .find(
          (event): event is LegacyModificationImported =>
            event.type === LegacyModificationImported.type
        )

      expect(targetEvent).toBeDefined()
      if (!targetEvent) return

      expect(targetEvent.payload).toEqual({
        importId,
        modifications,
        projectId,
      })
    })
  })

  describe('when the project does not exist', () => {
    const findProjectByIdentifiers = jest.fn(() =>
      okAsync(null)
    ) as unknown as FindProjectByIdentifiers

    beforeAll(async () => {
      eventBus.publish.mockClear()

      await handleLegacyModificationRawDataImported({
        eventBus,
        findProjectByIdentifiers,
      })(
        new LegacyModificationRawDataImported({
          payload: { importId, appelOffreId, periodeId, familleId, numeroCRE, modifications },
        })
      )
    })
    it('should not trigger', () => {
      expect(eventBus.publish).not.toHaveBeenCalled()
    })
  })
})
