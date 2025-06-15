import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.http import Request
from ..items import SkillIndiaItem
import json

class SkillindiaSpiderSpider(CrawlSpider):
    name = 'skillindia_spider'
    allowed_domains = ['skillindiadigital.gov.in']
    start_urls = ['https://www.skillindiadigital.gov.in/']
    
    custom_settings = {
        'ROBOTSTXT_OBEY': False,
        'DOWNLOAD_DELAY': 2,
        'CONCURRENT_REQUESTS': 1,
        'COOKIES_ENABLED': True,
        'DEFAULT_REQUEST_HEADERS': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }

    def start_requests(self):
        # Start with the main API endpoints
        api_urls = [
            'https://www.skillindiadigital.gov.in/api/courses',
            'https://www.skillindiadigital.gov.in/api/skills',
            'https://www.skillindiadigital.gov.in/api/jobs'
        ]
        
        for url in api_urls:
            yield Request(
                url=url,
                callback=self.parse_api,
                errback=self.handle_error,
                dont_filter=True
            )

    def parse_api(self, response):
        try:
            data = json.loads(response.text)
            
            if 'courses' in response.url:
                for course in data.get('data', []):
                    item = SkillIndiaItem()
                    item['type'] = 'course'
                    item['title'] = course.get('title')
                    item['description'] = course.get('description')
                    item['duration'] = course.get('duration')
                    item['level'] = course.get('level')
                    yield item
                    
            elif 'skills' in response.url:
                for skill in data.get('data', []):
                    item = SkillIndiaItem()
                    item['type'] = 'skill'
                    item['title'] = skill.get('title')
                    item['description'] = skill.get('description')
                    item['category'] = skill.get('category')
                    yield item
                    
            elif 'jobs' in response.url:
                for job in data.get('data', []):
                    item = SkillIndiaItem()
                    item['type'] = 'job'
                    item['title'] = job.get('title')
                    item['company'] = job.get('company')
                    item['location'] = job.get('location')
                    item['description'] = job.get('description')
                    yield item
                    
        except json.JSONDecodeError:
            self.logger.error(f"Failed to parse JSON from {response.url}")
            
    def handle_error(self, failure):
        self.logger.error(f"Request failed: {failure.request.url}")
        
    def parse(self, response):
        # Fallback parsing for HTML content
        if 'course' in response.url:
            yield from self.parse_course(response)
        elif 'skill' in response.url:
            yield from self.parse_skill(response)
        elif 'job' in response.url:
            yield from self.parse_job(response)

    def parse_course(self, response):
        item = SkillIndiaItem()
        item['type'] = 'course'
        
        # Try multiple selectors for each field
        item['title'] = (
            response.css('h1.title::text, .course-title::text, .heading::text').get() or
            response.xpath('//h1[contains(@class, "title")]/text()').get()
        )
        
        item['description'] = ' '.join(
            response.css('.course-description::text, .description::text, .content p::text').getall() or
            response.xpath('//div[contains(@class, "description")]//text()').getall()
        )
        
        item['duration'] = (
            response.css('.duration::text, .course-duration::text, .time::text').get() or
            response.xpath('//span[contains(@class, "duration")]/text()').get()
        )
        
        item['level'] = (
            response.css('.level::text, .course-level::text, .difficulty::text').get() or
            response.xpath('//span[contains(@class, "level")]/text()').get()
        )
        
        if item['title']:
            yield item

    def parse_skill(self, response):
        item = SkillIndiaItem()
        item['type'] = 'skill'
        
        item['title'] = (
            response.css('h1.title::text, .skill-title::text, .heading::text').get() or
            response.xpath('//h1[contains(@class, "title")]/text()').get()
        )
        
        item['description'] = ' '.join(
            response.css('.skill-description::text, .description::text, .content p::text').getall() or
            response.xpath('//div[contains(@class, "description")]//text()').getall()
        )
        
        item['category'] = (
            response.css('.category::text, .skill-category::text, .type::text').get() or
            response.xpath('//span[contains(@class, "category")]/text()').get()
        )
        
        if item['title']:
            yield item

    def parse_job(self, response):
        item = SkillIndiaItem()
        item['type'] = 'job'
        
        item['title'] = (
            response.css('h1.title::text, .job-title::text, .heading::text').get() or
            response.xpath('//h1[contains(@class, "title")]/text()').get()
        )
        
        item['company'] = (
            response.css('.company::text, .company-name::text, .employer::text').get() or
            response.xpath('//span[contains(@class, "company")]/text()').get()
        )
        
        item['location'] = (
            response.css('.location::text, .job-location::text, .place::text').get() or
            response.xpath('//span[contains(@class, "location")]/text()').get()
        )
        
        item['description'] = ' '.join(
            response.css('.job-description::text, .description::text, .content p::text').getall() or
            response.xpath('//div[contains(@class, "description")]//text()').getall()
        )
        
        if item['title']:
            yield item 