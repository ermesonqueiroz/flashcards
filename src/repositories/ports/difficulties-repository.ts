import { type DifficultyData } from '@entities/difficulty'

export interface DifficultiesRepository {
  add: (difficulty: DifficultyData) => Promise<void>
  findByName: (name: string) => Promise<DifficultyData | null>
}
