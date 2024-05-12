import Parser from 'rss-parser';
import { IParseStrategy } from './parse-strategy.inteface';
import { CreateCareerDto } from 'apps/careers/src/dto/create-career.dto';
import moment from 'moment';

export class RssParseStrategy implements IParseStrategy {
  private parser = new Parser();
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  validateCareer(career: Parser.Item): CreateCareerDto {
    if (
      !career.guid ||
      !career.title ||
      !career.link ||
      !career.content ||
      !career.isoDate
    ) {
      throw new Error('Unsupported career structure');
    }

    const createdAt = moment(career.isoDate).toDate();
    return {
      title: career.title,
      description: career.content,
      url: career.link,
      careerId: career.guid,
      postedAt: createdAt,
      categories: career.categories,
    };
  }

  async parse() {
    const data = await this.parser.parseURL(this.url);
    return data.items.map(this.validateCareer);
  }
}
