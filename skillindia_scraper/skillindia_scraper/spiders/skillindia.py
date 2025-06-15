import scrapy


class SkillindiaSpider(scrapy.Spider):
    name = "skillindia"
    allowed_domains = ["www.skillindiadigital.gov.in"]
    start_urls = ["https://www.skillindiadigital.gov.in/sector/list?forCourse=true"]

    def parse(self, response):
        # Extract all sector items
        sectors = response.css('div.sector-item')
        
        for sector in sectors:
            yield {
                'name': sector.css('h4.sector-name::text').get(),
                'description': sector.css('p.sector-description::text').get(),
                'courses': sector.css('ul.course-list li::text').getall(),
                'url': response.urljoin(sector.css('a::attr(href)').get())
            }
