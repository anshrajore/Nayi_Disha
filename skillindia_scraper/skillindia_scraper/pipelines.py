# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class SkillindiaScraperPipeline:
    def process_item(self, item, spider):
        return item

    def start_requests(self):
        yield scrapy.Request('https://www.skillindiadigital.gov.in/courses', callback=self.parse_listing)

    def parse_listing(self, response):
        # Adjust selector to match actual course links
        for href in response.css('a.course-link::attr(href)').getall():
            yield response.follow(href, self.parse_course)
