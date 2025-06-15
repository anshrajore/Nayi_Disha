import json
from itemadapter import ItemAdapter

class SkillindiaPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Clean and validate fields
        for field in adapter.field_names():
            if field in adapter:
                value = adapter.get(field)
                if isinstance(value, str):
                    adapter[field] = value.strip()
        
        return item

class JsonWriterPipeline:
    def open_spider(self, spider):
        self.file = open('skillindia_data.json', 'w')
        self.file.write('[\n')
        self.first_item = True

    def close_spider(self, spider):
        self.file.write('\n]')
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(ItemAdapter(item).asdict())
        if not self.first_item:
            self.file.write(',\n')
        self.file.write(line)
        self.first_item = False
        return item 