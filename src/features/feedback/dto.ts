export interface PhotoDto {
  readonly src: string
  readonly width: number
  readonly height: number
}

export interface FeedbackDto {
  readonly text: string | null
  readonly photos: PhotoDto[] | null
  readonly video: string | null
}
