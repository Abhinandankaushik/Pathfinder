import PropTypes from 'prop-types';
import Icon from './Icon';

const RoadmapDisplay = ({ roadmap, isLoading, expandedPhases, togglePhase }) => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Your Learning Roadmap</h2>
            <p className="text-gray-500 mt-2">Your AI-crafted learning path will appear here.</p>
        </div>

        <div className="min-h-[500px]">
            {isLoading ? (
                <div className="flex items-center justify-center h-[500px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Crafting your roadmap...</p>
                        <p className="text-sm text-gray-400 mt-2">This won't take long!</p>
                    </div>
                </div>
            ) : roadmap ? (
                <div className="space-y-8">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-3 tracking-tight">🎯 {roadmap.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                                <div className="flex items-center space-x-2">
                                    <Icon name="Clock" className="h-5 w-5" />
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">{roadmap.overview.duration}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                                <div className="flex items-center space-x-2">
                                    <Icon name="User" className="h-5 w-5" />
                                    <span className="text-sm font-medium">Level</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">{roadmap.overview.level}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                                <div className="flex items-center space-x-2">
                                    <Icon name="BookOpen" className="h-5 w-5" />
                                    <span className="text-sm font-medium">Style</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">{roadmap.overview.style}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-900 tracking-tight">📚 Learning Phases</h4>
                        {roadmap.phases.map((phase, index) => (
                            <div key={phase.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div
                                    className={`bg-indigo-600 text-white p-5 cursor-pointer hover:opacity-90 transition-all duration-200`}
                                    onClick={() => togglePhase(phase.id)}
                                    aria-expanded={expandedPhases[phase.id]}
                                    aria-controls={`phase-content-${phase.id}`}
                                    role="button"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Icon name={phase.iconName} className="h-6 w-6" />
                                            <div>
                                                <h5 className="font-semibold text-lg tracking-tight">
                                                    Phase {index + 1}: {phase.title}
                                                </h5>
                                                <p className="text-sm opacity-90">{phase.duration}</p>
                                            </div>
                                        </div>
                                        <Icon name={expandedPhases[phase.id] ? 'ChevronDown' : 'ChevronRight'} className="h-6 w-6" />
                                    </div>
                                </div>

                                {expandedPhases[phase.id] && (
                                    <div className="p-6 bg-gray-50 space-y-6 animate-fadeIn" id={`phase-content-${phase.id}`}>
                                        <div>
                                            <h6 className="font-semibold text-gray-900 mb-3">🎯 Objective</h6>
                                            <p className="text-gray-600">{phase.objective}</p>
                                        </div>
                                        <div>
                                            <h6 className="font-semibold text-gray-900 mb-3">📋 Key Activities</h6>
                                            <ul className="space-y-3">
                                                {phase.activities.map((activity, i) => (
                                                    <li key={i} className="flex items-start space-x-3">
                                                        <span className="text-indigo-500 mt-1">•</span>
                                                        <span className="text-gray-600">{activity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h6 className="font-semibold text-gray-900 mb-3">🏆 Milestones</h6>
                                            <div className="space-y-3">
                                                {phase.milestones.map((milestone, i) => (
                                                    <div key={i} className="flex items-center space-x-3">
                                                        <Icon name="CheckCircle" className="h-5 w-5 text-indigo-500" />
                                                        <span className="text-gray-600">{milestone}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="font-semibold text-gray-900 mb-3">📚 Resources</h6>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {phase.resources.map((resource, i) => (
                                                    <div key={i} className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors duration-200">
                                                        <span className="text-gray-600 text-sm">{resource}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-2xl shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                            <Icon name="Calendar" className="h-6 w-6 text-indigo-600" />
                            <span>📅 Weekly Schedule</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(roadmap.schedule).map(([day, activity]) => (
                                <div key={day} className="bg-white p-4 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors duration-200">
                                    <h6 className="font-semibold text-gray-900 capitalize mb-2">{day}</h6>
                                    <p className="text-gray-600 text-sm">{activity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-2xl shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                            <Icon name="Star" className="h-6 w-6 text-green-600" />
                            <span>💡 Success Tips</span>
                        </h4>
                        <div className="space-y-4">
                            {roadmap.tips.map((tip, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-600 flex-1">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                            <Icon name="Award" className="h-6 w-6 text-orange-600" />
                            <span>📈 Assessment Checkpoints</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roadmap.checkpoints.map((checkpoint, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors duration-200">
                                    <h6 className="font-semibold text-orange-600 mb-1">Week {checkpoint.week}</h6>
                                    <p className="text-gray-600 text-sm">{checkpoint.task}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 shadow-md">
                        <div className="flex items-start space-x-3">
                            <Icon name="CheckCircle" className="h-6 w-6 text-green-600 mt-0.5" />
                            <div>
                                <p className="text-green-800 font-semibold">Success!</p>
                                <p className="text-green-600 text-sm mt-1">
                                    Your personalized roadmap is ready. Explore each phase for detailed guidance!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-[500px] text-gray-500">
                    <div className="text-center">
                        <Icon name="Target" className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                        <p className="text-xl font-semibold text-gray-700">Ready to Learn?</p>
                        <p className="text-sm text-gray-500 mt-2">Fill out the form to generate your custom roadmap.</p>
                    </div>
                </div>
            )}
        </div>
    </div>
);

RoadmapDisplay.propTypes = {
    roadmap: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    expandedPhases: PropTypes.object.isRequired,
    togglePhase: PropTypes.func.isRequired,
};

export default RoadmapDisplay;