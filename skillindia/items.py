import scrapy

class SkillIndiaItem(scrapy.Item):
    type = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()
    
    # Course specific fields
    duration = scrapy.Field()
    level = scrapy.Field()
    
    # Skill specific fields
    category = scrapy.Field()
    
    # Job specific fields
    company = scrapy.Field()
    location = scrapy.Field() 