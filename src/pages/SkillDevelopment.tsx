import React from 'react';
import Layout from '@/components/Layout';
import SkillSectors from '@/components/SkillSectors';
import { Button } from '@/components/ui/button';
import { GraduationCap, Target, Users, Award } from 'lucide-react';

const SkillDevelopment = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nayidisha-blue-50 to-nayidisha-blue-100 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-nayidisha-blue">
              Skill Development
            </h1>
            <p className="text-lg mb-8">
              Enhance your skills and boost your career prospects with our comprehensive training programs
              aligned with Skill India Digital's mission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
                Explore Courses
              </Button>
              <Button variant="outline">
                Get Certified
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Training Programs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-nayidisha-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-nayidisha-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry-Relevant Skills</h3>
              <p className="text-gray-600">
                Learn skills that are in high demand in today's job market
              </p>
            </div>
            <div className="text-center">
              <div className="bg-nayidisha-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-nayidisha-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Training</h3>
              <p className="text-gray-600">
                Get recognized certifications that boost your employability
              </p>
            </div>
            <div className="text-center">
              <div className="bg-nayidisha-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-nayidisha-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced professionals in your field
              </p>
            </div>
            <div className="text-center">
              <div className="bg-nayidisha-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-nayidisha-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Placement Support</h3>
              <p className="text-gray-600">
                Get assistance in finding employment after completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Sectors Section */}
      <SkillSectors />

      {/* Call to Action */}
      <section className="py-20 px-4 bg-nayidisha-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step towards a brighter future with our skill development programs
          </p>
          <Button size="lg" className="bg-white text-nayidisha-blue hover:bg-gray-100">
            Get Started Today
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SkillDevelopment;
