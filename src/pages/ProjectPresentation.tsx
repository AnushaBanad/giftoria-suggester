
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Presentation, Gift, Code, Server, Check, X, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProjectPresentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2C3E50] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Presentation className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold">Gift Suggestion App - Presentation Outline</h1>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              Back to App
            </Button>
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-none mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Gift className="w-6 h-6 text-emerald-400" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-200 mb-4">
              This outline provides the structure for a presentation about the Gift Suggestion Application.
              The presentation will cover all aspects of the project from introduction to technical requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-400 mb-2">Project Name</h3>
                <p>Gift Suggestion Application</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-400 mb-2">Platform</h3>
                <p>Web Application (React)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">1</span>
              Introduction
            </h2>
            <Card className="bg-white/10 backdrop-blur-md border-none">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Overview of the gift suggestion application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Problem statement: Difficulty in finding appropriate gifts based on interests and budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Brief description of the solution provided by the application</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">2</span>
              System Analysis
            </h2>
            <Card className="bg-white/10 backdrop-blur-md border-none mb-4">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Analysis of current gift suggestion processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Identification of user needs and pain points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>System architecture and data flow diagrams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>Analysis of competitive solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="pl-8 space-y-4">
              <section>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-emerald-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2.1</span>
                  Scope of the Project
                </h3>
                <Card className="bg-white/10 backdrop-blur-md border-none">
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Definition of project boundaries and limitations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Features included in the application (interest-based filtering, budget constraints, occasion matching)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Features excluded from the current version</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-emerald-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2.2</span>
                  Aim of Project
                </h3>
                <Card className="bg-white/10 backdrop-blur-md border-none">
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Primary objective: To simplify the gift selection process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Secondary objectives: Personalization, budget consideration, occasion-specific suggestions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                        <span>Key performance indicators for measuring success</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="bg-emerald-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2.3</span>
                  Hardware and Software Requirements
                </h3>
                <Card className="bg-white/10 backdrop-blur-md border-none">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                          <Server className="w-5 h-5" />
                          Hardware Requirements
                        </h4>
                        <ul className="space-y-2 text-gray-200">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Web server specifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Storage requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Network infrastructure</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          Software Requirements
                        </h4>
                        <ul className="space-y-2 text-gray-200">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Frontend: React, TypeScript, Tailwind CSS</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Database requirements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>API integrations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                            <span>Deployment environment</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">3</span>
              Advantages
            </h2>
            <Card className="bg-white/10 backdrop-blur-md border-none">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>Personalized gift suggestions based on interests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>Budget-conscious recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>Time-saving compared to traditional gift shopping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>Occasion-specific gift ideas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>User-friendly interface</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">4</span>
              Disadvantages
            </h2>
            <Card className="bg-white/10 backdrop-blur-md border-none">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                    <span>Limited to pre-defined interest categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                    <span>Dependence on external shop links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                    <span>Requires internet connectivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                    <span>Limited to digital browsing experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg">5</span>
              References
            </h2>
            <Card className="bg-white/10 backdrop-blur-md border-none">
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <Book className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>React documentation - <a href="https://reactjs.org" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://reactjs.org</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Book className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>Tailwind CSS documentation - <a href="https://tailwindcss.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://tailwindcss.com</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Book className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>Gift industry market research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Book className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>User experience design principles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <img 
            src="/lovable-uploads/cef5cf4e-d1b1-46d0-8012-703f3e8b2db6.png" 
            alt="Presentation Outline" 
            className="max-w-full rounded-lg shadow-lg border border-white/10"
          />
        </div>
        
        <div className="text-center mt-12">
          <Link to="/dashboard">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Return to Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPresentation;
