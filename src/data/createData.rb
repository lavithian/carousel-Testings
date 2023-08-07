require 'json'
require 'cgi'
require 'csv'
require 'nokogiri'
require 'http'
require 'fileutils'
require 'uri'
require 'net/http'

def findLink(url, regex)
  foundLink = nil
  uri = URI(url)

  begin
    response = Net::HTTP.get_response(uri)
  rescue StandardError => e
    puts "Error: #{e.message}"
    return nil
  end

  if response.is_a?(Net::HTTPSuccess)
    response_body = response.body
    foundLink = response_body.scan(regex)
    if foundLink.any?
      return "https://" + foundLink.first
    end
  elsif response.is_a?(Net::HTTPNotFound)
    puts "404 Error"
  else
    puts "Request failed with status: #{response.code} #{response.message}"
  end
  return nil
end

def extractImageLink file
  puts 'Scraping images'
  file.each do |gear|
    type = gear['category'].capitalize
    name = gear['name']
    string = "Gear_#{type}_#{name}.png"
    url = "https://splatoonwiki.org/wiki/File:S3_#{CGI.escape(string)}"
    regex = Regexp.new(/cdn.wikimg.net\/en\/splatoonwiki\/images\/.\/..\/S3_#{CGI.escape(string)}/)
    found_link = findLink(url, regex)
    gear['image'] = found_link
    print "\e[32m.\e[0m"
  end
end

def extractDescription name
  url = "https://splatoonwiki.org/wiki/#{name}"
  response = HTTP.get(url)
  return 'Description Not Found' unless response.status.success?

  page = Nokogiri::HTML(response.to_s)
  return (page.xpath("//h2/span[@id='Appearance']/../following-sibling::p[1]//text()").map(&:text)).join("").strip

end

def getDescription file
  puts 'Scraping Descriptions...'
  file.each do |gear|
    name = gear['name']
    gear['description'] = extractDescription(name)
    gear['description'] = 'No Description Found' if gear['description'].nil? || gear['description'].empty?
    print "\e[33m.\e[0m"
  end
end

def separateGearByBrand(data, brand_list, category)
  puts 'Reorganising gear by Brand...'
  brand_list.each do |brand|
    gearhash = []
    data.each do |gear|
      gearhash << gear if brand['brand'] == gear['brand']
    end
    FileUtils.mkdir_p("./splatoon_data/#{category}/")
    file_dir = "./splatoon_data/#{category}/#{category}_#{brand['brand']}.json"

    File.open(file_dir, "a") do |f|
      f.puts(gearhash.to_json.gsub!("\xEF\xBB\xBF", ''))
    end

    print "\e[34m.\e[0m"
  end
end

def writeIndexJs(category, brand_list)
  puts 'Creating Index.js file...'
  fileDir = "./splatoon_data/#{category}/index.js"
  fileNameArray = []

  brand_list.each do |brand|
    brandName = brand['brand']
    importTextBrand = brandName.sub(/([+-])/, '')
    importText = "import #{category}#{importTextBrand} from './#{category}_#{brandName}.json';"
    File.open(fileDir, 'a') do |f|
      f.puts(importText)
    end
    fileNameArray << "#{importTextBrand}: #{category}#{importTextBrand}"
    print "\e[35m.\e[0m"
  end

  File.open(fileDir, 'a') do |f|
    f.puts('')
    f.puts("const #{category}Data = {");
    fileNameArray.each do |filename|
      f.puts("\t#{filename},")
    end
    f.puts('};')
    f.puts("export default #{category}Data")
  end
end

def createData file
  brand_list = JSON.parse(File.open('./splatoon_data/originalData/brandList.json').read)
  data = []
  CSV.foreach(file, headers: true) do |row|
    data << row.to_hash
  end

  category = data[0]['category']
  puts "Creating Data #{category}..."
  extractImageLink data
  puts ''
  getDescription data
  puts ''
  separateGearByBrand(data, brand_list, category)
  puts ''
  writeIndexJs(category, brand_list)
  puts ''
  FileUtils.cp('./splatoon_data/originalData/brandList.json', './splatoon_data/brands.json')
  File.write("./splatoon_data/#{category}.json", data.to_json.gsub!("\xEF\xBB\xBF", ''), encoding: 'UTF-8')
  puts "#{category} Data parsed and created!"
end

headgearCSV = './splatoon_data/originalData/headgear.csv'
clothingCSV = './splatoon_data/originalData/clothing.csv'
shoesCSV = './splatoon_data/originalData/shoes.csv'

createData headgearCSV
# createData(clothingCSV)
# createData(shoesCSV)
puts "All done!"
