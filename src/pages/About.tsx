import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HeartHandshake, 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Calendar, 
  Map, 
  Building, 
  GraduationCap, 
  Phone,
  Clock,
  Rocket,
  Code,
  Users2,
  Building2
} from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-nayidisha-blue-50 to-nayidisha-blue-100 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-nayidisha-blue">About NayiDisha</h1>
            <p className="text-lg mb-8">
              We're on a mission to transform the blue-collar job market in India by connecting skilled workers 
              with quality employment opportunities through innovative technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-nayidisha-blue hover:bg-nayidisha-blue-600">
                Our Story
              </Button>
              <Button variant="outline">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-nayidisha-blue text-white rounded-lg p-2">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-semibold">2025</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                  <p className="text-gray-600">
                    NayiDisha started as a small team with a big vision. We began by conducting extensive research 
                    on the challenges faced by blue-collar workers in finding stable employment.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-nayidisha-blue text-white rounded-lg p-2">
                    <Rocket className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-semibold">2025</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">First Prototype</h3>
                  <p className="text-gray-600">
                    We launched our first prototype in three cities, connecting electricians and plumbers with local 
                    businesses. The response exceeded our expectations.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-nayidisha-blue text-white rounded-lg p-2">
                    <Map className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-semibold">2025</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Scaling Up</h3>
                  <p className="text-gray-600">
                    Secured seed funding to expand our operations. Added more job categories and extended our reach 
                    to 10 major cities across India.
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-nayidisha-blue text-white rounded-lg p-2">
                    <Code className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-semibold">2025</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Technology Innovation</h3>
                  <p className="text-gray-600">
                    Introduced AI-powered matching algorithms and voice interfaces to make our platform more 
                    accessible to workers with varying levels of digital literacy.
                  </p>
                </div>
              </div>

              {/* Timeline Item 5 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-nayidisha-blue text-white rounded-lg p-2">
                    <Users2 className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-semibold">2025</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Present Day</h3>
                  <p className="text-gray-600">
                    Today, NayiDisha serves over 100,000 workers and 5,000 businesses across India, with a 
                    comprehensive platform that includes skill development, job matching, and career support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="w-8 h-8 text-nayidisha-blue" />
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                </div>
                <p className="text-gray-600">
                  To bridge the gap between skilled blue-collar workers and quality employment opportunities, 
                  creating a more efficient and equitable job market in India.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Lightbulb className="w-8 h-8 text-nayidisha-blue" />
                  <h3 className="text-xl font-semibold">Our Vision</h3>
                </div>
                <p className="text-gray-600">
                  To become India's leading platform for blue-collar employment, empowering workers with 
                  opportunities for growth and businesses with access to quality talent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-nayidisha-blue mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">100,000+</div>
                <p className="text-gray-600">Workers Connected</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Building2 className="w-12 h-12 text-nayidisha-blue mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <p className="text-gray-600">Businesses Served</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Map className="w-12 h-12 text-nayidisha-blue mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">10+</div>
                <p className="text-gray-600">Major Cities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
