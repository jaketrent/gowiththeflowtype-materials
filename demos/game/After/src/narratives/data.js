// @flow

import type { Narrative } from './types'

export const fetchAll = async (): Promise<Narrative[]> =>
  Promise.resolve([
    {
      id: 0,
      text: 'This is the data text',
      prompt: 'What will you do next?',
      choices: [1, 2]
    },
    {
      id: 1,
      text: 'some story a',
      choiceText: 'go with option a'
    },
    {
      id: 2,
      text: 'some story b',
      choiceText: 'go with option b'
    }
  ])
