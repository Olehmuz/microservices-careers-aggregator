import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Parser from 'rss-parser';

@Injectable()
export class DouStrategy {
  private readonly rssLinks: string[];
  private readonly parser = new Parser({});
  constructor(private readonly configService: ConfigService) {
    if (!configService.get('RSS_LINKS')) {
      console.log('[PARSER SERVICE] RSS_LINKS env variable is not defined');
      throw new Error('RSS_LINKS env variable is not defined');
    }
    this.rssLinks = configService.get('RSS_LINKS').split(',');
  }

  validateCareer(career: Parser.Item): any {
    if (
      !career.guid ||
      !career.title ||
      !career.link ||
      !career.content ||
      !career.isoDate ||
      !career.creator
    ) {
      throw new Error('Unsupported career structure');
    }
    // const createdAt = moment(career.isoDate).toDate();
    return career;
  }

  async fetchCareers(): Promise<Parser.Item[]> {
    try {
      const promises = this.rssLinks.map((link) => this.parser.parseURL(link));
      const results = await Promise.all(promises);
      return results.flatMap((result) => result.items);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`[EXCEPTION] message: ${error.message}]`);
      }
      return [];
    }
  }

  async parseCareers(): Promise<void> {
    try {
      const fetchedCareers = await this.fetchCareers();
      const articles = fetchedCareers.map(this.validateCareer);
      if (!articles.length) {
        return;
      }
      console.log(articles);
      //   for (const career of articles) {
      //     if (!career.articleId) {
      //       continue;
      //     }
      //     const existedCareer = await this.articlesService.findCareerByFilter({
      //       articleId: career.articleId,
      //     });
      //     if (existedCareer) continue;
      //     await this.articlesService.createCareer(career);
      //     console.log(`[PARSER SERVICE] Career ${career.articleId} was created`);
      //   }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`[EXCEPTION] message: ${error.message}]`);
      }
    }
  }
}
