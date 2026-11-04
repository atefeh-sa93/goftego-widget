import { afterEach, describe, expect, it } from 'vitest';
import { VERSION } from '../../src/index.js';

describe('test environment', () => {
  afterEach(() => document.body.replaceChildren());

  it('exposes the package version', () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
  });

  // Proves tests run in a real browser: page styles must not reach into a shadow root.
  it('isolates shadow DOM from page styles', () => {
    const style = document.createElement('style');
    style.textContent = 'p { color: rgb(255, 0, 0); }';
    document.head.append(style);

    const host = document.createElement('div');
    host.attachShadow({ mode: 'open' }).innerHTML = '<p>inside</p>';
    const outside = document.createElement('p');
    document.body.append(host, outside);

    const inside = host.shadowRoot?.querySelector('p');
    expect(inside).toBeTruthy();
    expect(getComputedStyle(outside).color).toBe('rgb(255, 0, 0)');
    expect(getComputedStyle(inside as Element).color).not.toBe('rgb(255, 0, 0)');
    style.remove();
  });
});
