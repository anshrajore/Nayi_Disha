import scrapy


class SkillindiaSpiderSpider(scrapy.Spider):
    name = "skillindia_spider"
    allowed_domains = ["skillindiadigital.gov.in"]
    start_urls = ["https://skillindiadigital.gov.in"]

    def parse(self, response):
        pass
