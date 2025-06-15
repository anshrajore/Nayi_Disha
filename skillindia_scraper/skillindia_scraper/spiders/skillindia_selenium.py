import scrapy
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrapy.http import HtmlResponse
import time
import logging

class SkillIndiaSeleniumSpider(scrapy.Spider):
    name = 'skillindia_selenium'
    allowed_domains = ['skillindiadigital.gov.in']
    start_urls = ['https://www.skillindiadigital.gov.in/courses']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 10)

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse, dont_filter=True)

    def parse(self, response):
        try:
            self.driver.get(response.url)
            self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            time.sleep(5)
            body = self.driver.page_source
            response = HtmlResponse(url=self.driver.current_url, body=body, encoding='utf-8')

            # Extract course data from cards
            for card in response.css('.skill-course-card-v3'):
                title = card.css('.skill-course-title::text').get()
                provider = card.css('.learning-provider-action span::text').get()
                sector = card.css('.sector-name a::text').get()
                duration = card.css('.sd-schedule-2 ~ p::text').get()
                language = card.css('.sd-globe-uk-2 ~ a::text').get()
                image = card.css('.skill-course-img-container img::attr(src)').get()
                url = response.url

                yield {
                    'title': title,
                    'provider': provider,
                    'sector': sector,
                    'duration': duration,
                    'language': language,
                    'image': image,
                    'url': url
                }
        except Exception as e:
            self.logger.error(f"Error in parse: {str(e)}")
        finally:
            self.driver.quit() 