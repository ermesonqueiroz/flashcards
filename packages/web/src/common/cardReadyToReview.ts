import * as dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

export function cardReadyToReview(lastView: string | null, weight: number | null): boolean {
  if (!lastView || !weight) return true

  const nextViewDate = dayjs(lastView)
    .add(
      weight,
      'day'
    )
  
  return dayjs().isSameOrAfter(nextViewDate)
}