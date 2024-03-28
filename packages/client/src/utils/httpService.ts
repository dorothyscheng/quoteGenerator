import { getApiUrl } from '~/utils/getApiUrl';
import { Logger } from '~/utils/logger';
import { IQuote } from '@violet/types';

class HttpService {
  apiUrl: string;
  constructor() {
    this.apiUrl = getApiUrl();
  }
  async getCharacterOptions(): Promise<string[]> {
    const path = `${this.apiUrl}/characters`;
    try {
      const response = await fetch(path);
      if (!response.ok) {
        Logger.error(
          `Unable to fetch from ${path} with status ${response.status}`
        );
        return [];
      }
      return await response.json();
    } catch (e) {
      Logger.error(e);
      return [];
    }
  }

  async getQuote(selectedCharacters: string[]): Promise<IQuote | undefined> {
    const selectedCharacterString = selectedCharacters
      .map((c) => c.toLowerCase())
      .join(',');
    const apiUrl = `${this.apiUrl}/quote?characters=${selectedCharacterString}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        Logger.error(
          `Unable to fetch from ${apiUrl} with status ${response.status}`
        );
        return;
      }
      return await response.json();
    } catch (e) {
      Logger.error(e);
    }
  }
}

export const httpService = new HttpService();
