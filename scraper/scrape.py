import requests
import json
from bs4 import BeautifulSoup

class Scraper:
    def __init__(self):
        self._salary_URL = "https://www.levels.fyi/companies/{company_name}/salaries/software-engineer/locations/india?country=113"
        self._company = None
        self._salaries = list()

    def scrape_salary(self):
        company_name = self._company.lower()
        url = self._salary_URL.format(company_name=company_name)
        r = requests.get(url)

        soup = BeautifulSoup(r.text, 'html.parser')
        next_data = soup.find('script', id='__NEXT_DATA__')
        if next_data:
            try:
                data = json.loads(next_data.string)
                data = data['props']['pageProps']
                salaries = data['averages']

                exchange_rate = data['locationExchangeRate']

                for salary in salaries:
                    primary_level_name = salary['primaryLevelName']
                    secondary_level_name = salary['secondaryLevelName'] if 'secondaryLevelName' in salary else None

                    compensation = {
                        'base': salary['rawValues']['base'] * exchange_rate,
                        'bonus': salary['rawValues']['bonus'] * exchange_rate,
                        'stock': salary['rawValues']['stock'] * exchange_rate,
                        'total_compensation': salary['rawValues']['total'] * exchange_rate
                    }

                    self._salaries.append({
                        'primary_level_name': primary_level_name,
                        'secondary_level_name': secondary_level_name,
                        'compensation': compensation
                    })

                return self._salaries

            except json.JSONDecodeError:
                print("Failed to parse JSON data from script tag")
                return None

    def set_company(self, company_name):
        self._company = company_name

    def get_company(self):
        return self._company
    
    def get_data(self):
        data = {
            "company_name": self._company,
            "salaries": self.scrape_salary()
        }

        return data

if __name__ == "__main__":
    sc = Scraper()

    sc.set_company("Oracle")
    salaries = sc.get_data()
    
    output = json.dumps(salaries, indent=2)
    print(output)