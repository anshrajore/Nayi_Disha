import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Wrench, Code, Factory, Car, Utensils, Heart, Leaf, Building, Microscope } from 'lucide-react';

// Skill sectors data
const skillSectors = [
  {
    name: "Agriculture",
    icon: Leaf,
    description: "Farming, horticulture, and agricultural technology",
    courses: ["Organic Farming", "Agricultural Technology", "Horticulture"]
  },
  {
    name: "Automotive",
    icon: Car,
    description: "Vehicle maintenance, repair, and manufacturing",
    courses: ["Auto Mechanics", "Auto Electronics", "Vehicle Painting"]
  },
  {
    name: "Construction",
    icon: Building,
    description: "Building, infrastructure, and real estate development",
    courses: ["Masonry", "Plumbing", "Electrical Installation"]
  },
  {
    name: "Healthcare",
    icon: Heart,
    description: "Medical services, nursing, and healthcare support",
    courses: ["Nursing", "Medical Lab Technology", "Healthcare Support"]
  },
  {
    name: "Hospitality",
    icon: Utensils,
    description: "Hotel management, tourism, and food services",
    courses: ["Hotel Operations", "Food & Beverage Service", "Tourism"]
  },
  {
    name: "IT & ITES",
    icon: Code,
    description: "Information technology and digital services",
    courses: ["Software Development", "Digital Marketing", "Data Analytics"]
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Industrial production and manufacturing processes",
    courses: ["CNC Operations", "Quality Control", "Industrial Automation"]
  },
  {
    name: "Retail",
    icon: Wrench,
    description: "Sales, customer service, and retail management",
    courses: ["Retail Sales", "Customer Service", "Store Management"]
  },
  {
    name: "Skill Development",
    icon: GraduationCap,
    description: "Vocational training and skill enhancement",
    courses: ["Vocational Training", "Skill Certification", "Career Counseling"]
  },
  {
    name: "Science & Technology",
    icon: Microscope,
    description: "Scientific research and technological innovation",
    courses: ["Laboratory Technology", "Research Methods", "Technical Analysis"]
  }
];

const SkillSectors = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Skill Sectors</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore various skill sectors and training programs aligned with Skill India Digital's mission
          to empower the workforce with industry-relevant skills.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillSectors.map((sector, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-nayidisha-blue/10 p-3 rounded-lg">
                    <sector.icon className="w-6 h-6 text-nayidisha-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">{sector.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{sector.description}</p>
                <div className="space-y-2">
                  {sector.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-nayidisha-blue rounded-full"></div>
                      {course}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSectors; 