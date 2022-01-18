import { UniqueEntityID } from '../../../../../core/domain'
import { ProjectPTFRemoved, ProjectPTFRemovedPayload } from '../../../../../modules/project'
import { resetDatabase } from '../../../helpers'
import { ProjectEvent } from '../projectEvent.model'
import onProjectPTFRemoved from './onProjectPTFRemoved'

describe('onProjectPTFRemoved', () => {
  const projectId = new UniqueEntityID().toString()
  const occurredAt = new Date('2022-01-04')
  const removedBy = 'user-id'

  beforeEach(async () => {
    await resetDatabase()
  })

  it('should create a new project event of type ProjectPTFRemoved', async () => {
    await onProjectPTFRemoved(
      new ProjectPTFRemoved({
        payload: {
          projectId,
          removedBy,
        } as ProjectPTFRemovedPayload,
        original: {
          version: 1,
          occurredAt,
        },
      })
    )

    const projectEvent = await ProjectEvent.findOne({ where: { projectId } })

    expect(projectEvent).not.toBeNull()
    expect(projectEvent).toMatchObject({
      projectId,
      type: 'ProjectPTFRemoved',
      valueDate: occurredAt.getTime(),
      eventPublishedAt: occurredAt.getTime(),
    })
  })
})
