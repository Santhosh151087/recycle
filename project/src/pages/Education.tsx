import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Filter, Leaf, Recycle, Trash2 } from 'lucide-react';

const Education: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: '1',
      title: 'The Complete Guide to Recycling Plastic',
      excerpt: 'Learn which plastics can be recycled and how to properly prepare them for recycling.',
      category: 'recycling',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Plastic recycling is one of the most effective ways to reduce environmental impact. Here's what you need to know:

**Types of Recyclable Plastics:**
- PET (1): Water bottles, food containers
- HDPE (2): Milk jugs, detergent bottles
- PVC (3): Pipes, packaging (limited recycling)
- LDPE (4): Plastic bags, squeeze bottles
- PP (5): Yogurt containers, bottle caps
- PS (6): Disposable cups, takeout containers
- Other (7): Mixed plastics (rarely recyclable)

**Preparation Tips:**
1. Clean containers thoroughly
2. Remove labels when possible
3. Separate caps from bottles
4. Never bag recyclables in plastic bags

**Common Mistakes:**
- Putting non-recyclable plastics in recycling bins
- Not cleaning containers properly
- Including plastic bags in curbside recycling`
    },
    {
      id: '2',
      title: 'Starting Your Home Composting Journey',
      excerpt: 'Everything you need to know about composting organic waste at home.',
      category: 'composting',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Composting transforms organic waste into nutrient-rich soil amendment. Here's how to get started:

**What to Compost:**
- Fruit and vegetable scraps
- Coffee grounds and tea bags
- Eggshells
- Yard trimmings
- Paper towels and newspaper

**What NOT to Compost:**
- Meat and fish
- Dairy products
- Oils and fats
- Pet waste
- Diseased plants

**Basic Composting Methods:**
1. **Bin Composting**: Use a enclosed bin for neat, contained composting
2. **Pile Composting**: Simple pile in your yard
3. **Tumbler Composting**: Rotating container for faster results
4. **Vermicomposting**: Using worms for indoor composting

**The Golden Rules:**
- Maintain proper carbon to nitrogen ratio (3:1)
- Keep compost moist but not soggy
- Turn regularly for aeration
- Be patient - composting takes 3-6 months`
    },
    {
      id: '3',
      title: 'Zero Waste Living: Small Steps, Big Impact',
      excerpt: 'Practical tips for reducing waste in your daily life and moving towards zero waste.',
      category: 'zero-waste',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Zero waste living is about minimizing the waste we send to landfills. Here's how to start:

**The 5 R's of Zero Waste:**
1. **Refuse**: Say no to things you don't need
2. **Reduce**: Minimize what you do need
3. **Reuse**: Find new purposes for items
4. **Recycle**: Process materials into new products
5. **Rot**: Compost organic materials

**Easy Swaps to Start:**
- Reusable water bottles instead of single-use
- Cloth bags for shopping
- Glass containers for food storage
- Bamboo toothbrushes
- Bar soap instead of liquid in plastic bottles

**Kitchen Zero Waste Tips:**
- Plan meals to reduce food waste
- Store food properly to extend freshness
- Use whole fruits and vegetables
- Make your own cleaning products
- Compost food scraps

**Remember**: Progress over perfection. Start with one or two changes and build from there.`
    },
    {
      id: '4',
      title: 'Understanding Landfill Impact',
      excerpt: 'Learn about the environmental consequences of landfill waste and alternatives.',
      category: 'environmental-impact',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/9324313/pexels-photo-9324313.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Understanding landfill impact helps us make better waste decisions:

**Environmental Consequences:**
- Greenhouse gas emissions (methane and CO2)
- Groundwater contamination
- Soil pollution
- Air quality degradation
- Loss of valuable land

**Items That Take Longest to Decompose:**
- Plastic bottles: 450 years
- Aluminum cans: 80-100 years
- Glass bottles: 1 million years
- Styrofoam: Never fully decomposes
- Cigarette butts: 10-12 years

**Reducing Landfill Waste:**
1. Choose reusable over disposable
2. Repair instead of replacing
3. Donate or sell usable items
4. Compost organic materials
5. Properly recycle appropriate materials

**The True Cost:**
Every item in landfills represents lost resources and energy that went into production, plus ongoing environmental damage.`
    },
    {
      id: '5',
      title: 'Sustainable Packaging Alternatives',
      excerpt: 'Discover eco-friendly packaging options and how to identify them.',
      category: 'sustainable-living',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Sustainable packaging reduces environmental impact throughout its lifecycle:

**Types of Sustainable Packaging:**
- Biodegradable materials (break down naturally)
- Compostable packaging (decomposes in composting conditions)
- Recyclable materials (can be processed into new products)
- Reusable containers (designed for multiple uses)

**Materials to Look For:**
- Paper and cardboard (from sustainable forests)
- Glass (infinitely recyclable)
- Aluminum (highly recyclable)
- Plant-based plastics (PLA, PHA)
- Mushroom packaging (mycelium-based)

**What to Avoid:**
- Mixed material packaging (hard to recycle)
- Excessive packaging layers
- Non-recyclable plastics
- Styrofoam and polystyrene

**Making Better Choices:**
1. Support brands with sustainable packaging
2. Choose products with minimal packaging
3. Bring your own containers when possible
4. Properly dispose of packaging materials`
    },
    {
      id: '6',
      title: 'Building a Circular Economy',
      excerpt: 'Understanding how circular economy principles can transform waste management.',
      category: 'circular-economy',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `The circular economy reimagines our relationship with resources:

**Linear vs. Circular Economy:**
- Linear: Take → Make → Dispose
- Circular: Reduce → Reuse → Recycle → Regenerate

**Core Principles:**
1. **Design out waste**: Create products for durability and reuse
2. **Keep products in use**: Extend lifecycles through sharing, repair, refurbishment
3. **Regenerate natural systems**: Return nutrients to the biosphere

**Examples in Action:**
- Product-as-a-service models
- Industrial symbiosis (one industry's waste becomes another's input)
- Cradle-to-cradle design
- Urban mining (recovering materials from waste)

**Individual Actions:**
- Choose durable, repairable products
- Participate in sharing economy
- Support businesses with circular practices
- Learn repair skills
- Compost organic materials

**Benefits:**
- Reduced resource consumption
- Lower environmental impact
- Economic opportunities
- Innovation driver
- Resilient systems`
    }
  ];

  const tips = [
    {
      category: 'recycling',
      icon: Recycle,
      title: 'Clean Before Recycling',
      description: 'Rinse containers to remove food residue before putting them in recycling bins.'
    },
    {
      category: 'composting',
      icon: Leaf,
      title: 'Balance Green and Brown',
      description: 'Mix nitrogen-rich greens (food scraps) with carbon-rich browns (dry leaves, paper).'
    },
    {
      category: 'reduction',
      icon: Trash2,
      title: 'Refuse Single-Use Items',
      description: 'Say no to plastic straws, utensils, and bags when you don\'t need them.'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'composting', label: 'Composting' },
    { value: 'zero-waste', label: 'Zero Waste' },
    { value: 'environmental-impact', label: 'Environmental Impact' },
    { value: 'sustainable-living', label: 'Sustainable Living' },
    { value: 'circular-economy', label: 'Circular Economy' }
  ];

  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (article) {
      return (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-green-600 hover:text-green-700 flex items-center"
          >
            ← Back to articles
          </button>
          
          <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }}></div>
            
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="capitalize bg-green-100 text-green-800 px-2 py-1 rounded-full mr-3">
                  {article.category.replace('-', ' ')}
                </span>
                <span>{article.readTime}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>
              
              <div className="prose prose-green max-w-none">
                {article.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="text-gray-700 mb-1">
                        {paragraph.slice(2)}
                      </li>
                    );
                  } else if (paragraph.match(/^\d+\./)) {
                    return (
                      <li key={index} className="text-gray-700 mb-1">
                        {paragraph}
                      </li>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return <br key={index} />;
                })}
              </div>
            </div>
          </article>
        </div>
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Education Center</h1>
        <p className="mt-2 text-gray-600">
          Learn sustainable practices and reduce your environmental impact
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
              <Icon className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-green-100">{tip.description}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${article.image})` }}
            ></div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="capitalize bg-green-100 text-green-800 px-2 py-1 rounded-full mr-3">
                  {article.category.replace('-', ' ')}
                </span>
                <span>{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              
              <button
                onClick={() => setSelectedArticle(article.id)}
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Read more
                <ExternalLink className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* External Resources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.epa.gov/recycle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900">EPA Recycling Guide</p>
              <p className="text-sm text-gray-500">Official recycling information</p>
            </div>
          </a>
          
          <a
            href="https://www.compostnow.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Composting Network</p>
              <p className="text-sm text-gray-500">Find local composting programs</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Education;