import { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from './ErrorBoundary';
import InputForm from './InputForm';
import RoadmapDisplay from './RoadmapDisplay';
import Icon from './Icon';

const RoadmapGenerator = () => {
    const [formData, setFormData] = useState({
        goal: '',
        currentLevel: '',
        timeframe: '',
        learningStyle: '',
        background: '',
        resources: '',
    });
    const [roadmap, setRoadmap] = useState(null);
    const [expandedPhases, setExpandedPhases] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePhase = (phaseId) => {
        setExpandedPhases((prev) => ({
            ...prev,
            [phaseId]: !prev[phaseId],
        }));
    };

    const generateRoadmap = async () => {
        setIsLoading(true);
        setError('');

        try {
            const GEMINI_API = import.meta.env.VITE_GEMINI_API_KEY;
            const API_ENDPOINT = import.meta.env.VITE_GEMINI_API_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
            if (!GEMINI_API) {
                throw new Error('API key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.');
            }

            const prompt = `Create a detailed learning roadmap for achieving the following goal. Return the response as a JSON object with the exact structure I will specify:

Goal: ${formData.goal}
Current Level: ${formData.currentLevel}
Timeframe: ${formData.timeframe}
Learning Style: ${formData.learningStyle}
Background: ${formData.background}
Preferred Resources: ${formData.resources}

Please return a JSON object with this exact structure:
{
  "title": "Learning goal title",
  "overview": {
    "duration": "timeframe from user input",
    "level": "current level from user input", 
    "style": "learning style from user input"
  },
  "phases": [
    {
      "id": "phase1",
      "title": "Phase title",
      "duration": "Duration like 'Weeks 1-2'",
      "color": "bg-blue-500",
      "objective": "Main objective of this phase",
      "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
      "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "resources": ["Resource 1", "Resource 2", "Resource 3"]
    },
    {
      "id": "phase2",
      "title": "Phase title",
      "duration": "Duration like 'Weeks 3-4'",
      "color": "bg-green-500",
      "objective": "Main objective of this phase",
      "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
      "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "resources": ["Resource 1", "Resource 2", "Resource 3"]
    },
    {
      "id": "phase3",
      "title": "Phase title",
      "duration": "Duration like 'Weeks 5-6'",
      "color": "bg-purple-500",
      "objective": "Main objective of this phase",
      "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
      "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "resources": ["Resource 1", "Resource 2", "Resource 3"]
    },
    {
      "id": "phase4",
      "title": "Phase title",
      "duration": "Duration like 'Weeks 7-8'",
      "color": "bg-orange-500",
      "objective": "Main objective of this phase",
      "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
      "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
      "resources": ["Resource 1", "Resource 2", "Resource 3"]
    }
  ],
  "schedule": {
    "monday": "Activity description",
    "tuesday": "Activity description", 
    "wednesday": "Activity description",
    "thursday": "Activity description",
    "friday": "Activity description",
    "saturday": "Activity description",
    "sunday": "Activity description"
  },
  "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "checkpoints": [
    {"week": 3, "task": "Assessment task"},
    {"week": 6, "task": "Assessment task"},
    {"week": 9, "task": "Assessment task"},
    {"week": 12, "task": "Assessment task"}
  ]
}

Make sure to provide specific, actionable content based on the user's goal and preferences. Return only the JSON object, no additional text.`;

            const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response structure from Gemini API');
            }

            const geminiResponse = data.candidates[0].content.parts[0].text;
            const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }

            const roadmapData = JSON.parse(jsonMatch[0]);
            const iconNames = ['BookOpen', 'TrendingUp', 'Star', 'Award'];
            roadmapData.phases = roadmapData.phases.map((phase, index) => ({
                ...phase,
                iconName: iconNames[index % iconNames.length],
            }));

            setRoadmap(roadmapData);
        } catch (err) {
            console.error('Error generating roadmap:', err);
            setError(`Failed to generate roadmap: ${err.message}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!formData.goal.trim()) {
            setError('Please enter your learning goal');
            return;
        }
        if (!formData.currentLevel) {
            setError('Please select your current level');
            return;
        }
        if (!formData.timeframe) {
            setError('Please select a timeframe');
            return;
        }
        generateRoadmap();
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
                <header className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-3 rounded-full">
                                <Icon name="Target" className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pathfinder</h1>
                                <p className="text-gray-600 text-base mt-1">Craft your personalized learning journey with AI</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <InputForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                            error={error}
                        />
                        <RoadmapDisplay
                            roadmap={roadmap}
                            isLoading={isLoading}
                            expandedPhases={expandedPhases}
                            togglePhase={togglePhase}
                        />
                    </div>
                </main>

                <footer className="bg-gray-800 text-white mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-400 mt-2">Your journey to mastering new skills starts here.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ErrorBoundary>
    );
};

RoadmapGenerator.propTypes = {
    roadmap: PropTypes.shape({
        title: PropTypes.string,
        overview: PropTypes.shape({
            duration: PropTypes.string,
            level: PropTypes.string,
            style: PropTypes.string,
        }),
        phases: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                duration: PropTypes.string,
                color: PropTypes.string,
                objective: PropTypes.string,
                activities: PropTypes.arrayOf(PropTypes.string),
                milestones: PropTypes.arrayOf(PropTypes.string),
                resources: PropTypes.arrayOf(PropTypes.string),
                iconName: PropTypes.string,
            })
        ),
        schedule: PropTypes.object,
        tips: PropTypes.arrayOf(PropTypes.string),
        checkpoints: PropTypes.arrayOf(
            PropTypes.shape({
                week: PropTypes.number,
                task: PropTypes.string,
            })
        ),
    }),
};

export default RoadmapGenerator;