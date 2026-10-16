import { describe, it, expect, beforeEach } from 'vitest';
import {
  apiClient,
  tokenStorage,
  bookmarksApi,
  experimentsApi,
  ChemicalBookmarkItem,
  VirtualExperimentItem
} from './api';

describe('Base API Client and Token Storage', () => {
  beforeEach(() => {
    tokenStorage.set(null);
  });

  it('stores and retrieves authentication tokens cleanly', () => {
    expect(tokenStorage.get()).toBeNull();
    tokenStorage.set('test-jwt-token-xyz');
    expect(tokenStorage.get()).toBe('test-jwt-token-xyz');
    tokenStorage.set(null);
    expect(tokenStorage.get()).toBeNull();
  });

  it('returns valid base API URL', () => {
    expect(apiClient.getBaseUrl()).toBeDefined();
    expect(typeof apiClient.getBaseUrl()).toBe('string');
  });
});

describe('Bookmarks API Client', () => {
  it('retrieves default bookmarks via fallback when backend is unreachable', async () => {
    const bookmarks = await bookmarksApi.getBookmarks();
    expect(Array.isArray(bookmarks)).toBe(true);
    expect(bookmarks.length).toBeGreaterThan(0);
    expect(bookmarks[0]).toHaveProperty('item_identifier');
    expect(bookmarks[0]).toHaveProperty('item_type');
  });

  it('creates and returns a bookmark object', async () => {
    const newBm = await bookmarksApi.createBookmark({
      item_type: 'compound',
      item_identifier: 'KMnO4',
      notes: 'Potassium permanganate strong oxidizer',
      metadata_json: JSON.stringify({ formula: 'KMnO4', title: 'Permanganate Titration Analyte' })
    });

    expect(newBm).toBeDefined();
    expect(newBm.item_identifier).toBe('KMnO4');
    expect(newBm.item_type).toBe('compound');
    expect(newBm.notes).toBe('Potassium permanganate strong oxidizer');
  });

  it('handles delete bookmark gracefully', async () => {
    const success = await bookmarksApi.deleteBookmark('bm-123');
    expect(typeof success).toBe('boolean');
  });
});

describe('Experiments API Client', () => {
  it('retrieves virtual lab experiments with fallback', async () => {
    const experiments = await experimentsApi.getExperiments();
    expect(Array.isArray(experiments)).toBe(true);
    expect(experiments.length).toBeGreaterThan(0);
    expect(experiments[0]).toHaveProperty('title');
    expect(experiments[0]).toHaveProperty('experiment_type');
  });

  it('persists a new virtual experiment record', async () => {
    const exp = await experimentsApi.saveExperiment({
      title: 'Aqueous Neutralization of HCl and NaOH',
      experiment_type: 'mixer',
      status: 'completed',
      observations: 'pH reached exactly 7.00 with neutral water formation.'
    });

    expect(exp).toBeDefined();
    expect(exp.title).toBe('Aqueous Neutralization of HCl and NaOH');
    expect(exp.experiment_type).toBe('mixer');
    expect(exp.status).toBe('completed');
  });
});
