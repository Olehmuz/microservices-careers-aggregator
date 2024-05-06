import Parser from 'rss-parser';

export class ParserService {
  private readonly parser = new Parser();
  async parse() {
    const data = await this.parser.parseURL('https://djinni.co/jobs/rss');
    return data;
    // this.parseStrategy.parseCareers();
  }
}
