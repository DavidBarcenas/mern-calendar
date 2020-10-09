import '@testing-library/jest-dom';
import { tokenlessFetch } from '../../utils/fetch';

describe('helpers testing', () => {
  test('tokenless token', async () => {
    const resp = await tokenlessFetch('auth', { email: 'davee@gmail.com', pwd: 'dave123' }, 'POST')
    expect(resp instanceof Response).toBeTruthy()

    const body = await resp.json()
    expect(body.ok).toBeTruthy()
  })
})
