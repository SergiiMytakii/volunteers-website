/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChildrenData } from '@/models/ChildrenData';


export class SheetsService {
  private static instance: SheetsService;
  private cacheMap: Map<string, ChildrenData[]> = new Map();
  private sheet: any;

  private constructor() {
    // Set up automatic cache clearing every hour
    setInterval(() => {
      this.cacheMap.clear();
    }, 360000); 
  }

  public static getInstance(): SheetsService {
    if (!SheetsService.instance) {
      SheetsService.instance = new SheetsService();
    }
    return SheetsService.instance;
  }

  private async loadSheet(apiEndpoint: string = '/api/sheets'): Promise<ChildrenData[]> {
        try {
          const response = await fetch(apiEndpoint, {
            method: "GET"
          });
          if (!response.ok) {
            console.error('Failed to fetch Google Sheet data');
          }
          const {data} = await response.json();
          return data.map((item: any) => new ChildrenData({
            id: item.id,
            name: item.name,
            nameEn: item.nameEn,
            age: item.age,
            dream: item.dream,
            dreamEn: item.dreamEn,
            imgSrc: item.imgSrc,
            fundOpen: item.fundOpen,
            desiredAmount: item.desiredAmount,
            funded: item.funded

          }));
        } catch (error) {
          console.error('Error fetching Google Sheet data:', error);
          return [];
        }
  }

  private async loadRows(apiEndpoint: string = '/api/sheets'): Promise<any[]> {
    const cacheKey = apiEndpoint;
    if (!this.cacheMap.has(cacheKey) || this.cacheMap.get(cacheKey)!.length === 0) {
      const sheet = await this.loadSheet(apiEndpoint);
      const sortedData = sheet.sort((a, b) => {
        if (a.fundOpen === b.fundOpen) return 0;
        return a.fundOpen ? -1 : 1;
      });
      this.cacheMap.set(cacheKey, sortedData);
    }
    
    return this.cacheMap.get(cacheKey)!;
  }

  public async getChildrenData(page: number, limit: number, apiEndpoint: string = '/api/sheets'): Promise<any[]> {
    const rows = await this.loadRows(apiEndpoint);
    const startRow = (page - 1) * limit;
    return rows.slice(startRow, startRow + limit);
  }
}
