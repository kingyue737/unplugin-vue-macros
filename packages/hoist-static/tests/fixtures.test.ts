import { describe, expect, test } from 'vitest'
import { transformHoistStatic } from '../src/core'

describe('fixtures', () => {
  const files = import.meta.glob('./fixtures/*.{vue,js,ts}', {
    eager: true,
    as: 'raw',
  })

  for (const [id, code] of Object.entries(files)) {
    test(id.replace(/\\/g, '/'), () => {
      const exec = () => transformHoistStatic(code, id)?.code

      if (id.includes('error')) {
        expect(exec).toThrowErrorMatchingSnapshot()
      } else {
        expect(exec()).toMatchSnapshot()
      }
    })
  }
})
