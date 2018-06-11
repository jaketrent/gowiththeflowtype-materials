// @flow
export type NarrativeId = number
export type Narrative = {
  id: NarrativeId,
  text: string,
  prompt?: string,
  choices?: NarrativeId[],
  choiceText?: string,
  image?: string
}
