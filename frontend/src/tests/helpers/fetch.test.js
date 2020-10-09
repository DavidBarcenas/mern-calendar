import '@testing-library/jest-dom';
import { tokenFetch, tokenlessFetch } from '../../utils/fetch';

describe('helpers testing', () => {

  let token = ''

  test('tokenless', async () => {
    const resp = await tokenlessFetch('auth', { email: 'davee@gmail.com', pwd: 'dave123' }, 'POST')
    expect(resp instanceof Response).toBeTruthy()

    const body = await resp.json()
    expect(body.ok).toBeTruthy()

    token = body.token
  })
  
  test('tokenFetch', async () => {
    const resp = await tokenFetch('events/5f7d15a960f6eb3a6cfa11de', {}, 'DELETE')
    const body = await resp.json()
    expect(body.ok).toBeFalsy()
  })
})
