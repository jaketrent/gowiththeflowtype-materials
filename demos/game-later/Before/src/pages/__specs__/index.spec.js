import { choice, end, getChoices, image, prompt, text, title } from '../index'

const narrative = { id: 111, text: 'some text' }
const narratives = [
  { id: 123, text: 'first narrative' },
  { id: 234, text: 'second narrative', choices: [123] },
  { id: 345, text: 'third narrative', choices: [123, 234] },
  { id: 456, text: 'fourth narrative' }
]
const store = {
  data: narratives
}

describe('#prompt', () => {
  test('takes props', () => {
    expect(prompt.length).toBe(1)
  })

  test('not shown if narrative prompt is missing', () => {
    const actual = prompt({ narrative, store })
    expect(actual).toBe(null)
  })

  test('returns html of narrative prompt', () => {
    const narrativePrompt = 'some prompt'
    const actual = prompt({
      narrative: { ...narrative, prompt: narrativePrompt },
      store
    })
    expect(actual).not.toBeNull()
    if (actual) {
      expect(actual.getHTML()).toEqual(expect.stringMatching(/index__prompt/))
      expect(actual.values).toEqual(expect.arrayContaining([narrativePrompt]))
    }
  })
})

describe('#text', () => {
  test('takes props', () => {
    expect(text.length).toBe(1)
  })

  test('returns html of narrative text', () => {
    const narrativeText = 'some text'
    const actual = text({ narrative, store })
    expect(actual.getHTML()).toEqual(expect.stringMatching(/index__text/))
    expect(actual.values).toEqual(expect.arrayContaining([narrativeText]))
  })
})

describe('#image', () => {
  test('takes props', () => {
    expect(image.length).toBe(1)
  })

  test('not shown if narrative image is missing', () => {
    const actual = image({ narrative, store })
    expect(actual).toBe(null)
  })

  test('returns html of image', () => {
    const img = 'some image'
    const actual = image({
      narrative: { ...narrative, image: img },
      store
    })
    expect(actual).not.toBeNull()
    if (actual) {
      expect(actual.getHTML()).toEqual(expect.stringMatching(/index__image/))
      expect(actual.values).toEqual(expect.arrayContaining([img]))
    }
  })
})

describe('#choice', () => {
  test('takes props', () => {
    expect(choice.length).toBe(1)
  })

  test('not shown if narrative choiceText is missing', () => {
    const actual = choice({ narrative, store })
    expect(actual).toBe(null)
  })

  // keep - tests content, not just type
  test('returns html of narrative choiceText', () => {
    const narrativeChoice = 'some choice'
    const actual = choice({
      narrative: { ...narrative, choiceText: narrativeChoice },
      store
    })
    expect(actual).not.toBeNull()
    if (actual) {
      expect(actual.getHTML()).toEqual(expect.stringMatching(/index__choice/))
      expect(actual.values).toEqual(expect.arrayContaining([narrativeChoice]))
    }
  })
})

describe('#title', () => {
  test('takes props arg', () => {
    expect(title.length).toBe(1)
  })

  test('returns styled template', () => {
    const actual = title({ narrative, store })
    expect(actual.getHTML()).toEqual(expect.stringMatching(/title/))
    expect(actual.getHTML()).toEqual(expect.stringMatching(/title-link/))
  })
})

describe('#getChoices', () => {
  test('returns narratives matching choices ids', () => {
    const actual = getChoices({ narrative: narratives[2], store })
    expect(actual).toEqual([narratives[0], narratives[1]])
  })
})

describe('#end', () => {
  test('takes props', () => {
    expect(end.length).toBe(1)
  })

  test('returns nothing if narrative has choices', () => {
    const actual = end({
      narrative: narratives[2],
      store
    })
    expect(actual).toEqual(null)
  })

  test('returns "the end" markup if narrative has no choices', () => {
    const actual = end({
      narrative: narrative,
      store
    })
    expect(actual).not.toBeNull()
    if (actual) {
      expect(actual.getHTML()).toEqual(expect.stringMatching(/index__end/))
    }
  })
})
